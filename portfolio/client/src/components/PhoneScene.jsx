import { useEffect, useRef } from 'react'

const ACCENT = '#167a50'
const BRIGHT = '#3ec98c'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

/**
 * Interactive hero centerpiece — three floating phone slabs (one per project)
 * orbiting above an audio-style waveform ring, dust particles, drag to rotate.
 * Calls onFallback() and renders nothing if WebGL is unavailable or scene
 * construction throws, so the caller can swap in the flat CSS composition.
 *
 * Three.js is loaded via a dynamic import so its ~600kB stays out of the
 * main bundle — the flat sections below the hero don't wait on it.
 */
export const PhoneScene = ({ onFallback }) => {
  const stageRef = useRef(null)

  useEffect(() => {
    const host = stageRef.current
    if (!host) return undefined
    if (!hasWebGL()) {
      onFallback(true)
      return undefined
    }

    let cancelled = false
    let renderer, raf, onResize, onPointerMove, onPointerDown, onPointerUp

    import('three')
      .then((THREE) => {
        if (cancelled) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
        camera.position.set(0, 0.4, 9.4)
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
        host.appendChild(renderer.domElement)
        renderer.domElement.style.display = 'block'

        const accent = new THREE.Color(ACCENT)
        const bright = new THREE.Color(BRIGHT)

        scene.add(new THREE.AmbientLight(0xffffff, 0.42))
        const key = new THREE.PointLight(bright, 90, 40)
        key.position.set(5, 6, 7)
        scene.add(key)
        const rim = new THREE.PointLight(0xffffff, 34, 40)
        rim.position.set(-7, -3, 4)
        scene.add(rim)

        const root = new THREE.Group()
        scene.add(root)

        // Three phone slabs — one per project
        const slabs = new THREE.Group()
        root.add(slabs)
        const body = new THREE.MeshStandardMaterial({ color: 0x0e1512, metalness: 0.65, roughness: 0.34 })
        const screen = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.6, roughness: 0.5 })
        const edge = new THREE.LineBasicMaterial({ color: bright, transparent: true, opacity: 0.5 })
        const geo = new THREE.BoxGeometry(1.28, 2.6, 0.13, 1, 1, 1)
        const edges = new THREE.EdgesGeometry(geo)
        const screenGeo = new THREE.PlaneGeometry(1.1, 2.36)
        ;[-2.5, 0, 2.5].forEach((x, i) => {
          const g = new THREE.Group()
          const mesh = new THREE.Mesh(geo, body)
          g.add(mesh)
          g.add(new THREE.LineSegments(edges, edge))
          const s = new THREE.Mesh(screenGeo, screen.clone())
          s.position.z = 0.071
          g.add(s)
          g.position.set(x, i === 1 ? 0.22 : -0.22, i === 1 ? 0.5 : -0.5)
          g.rotation.set(0, i === 0 ? 0.4 : i === 2 ? -0.4 : 0, i === 0 ? 0.06 : i === 2 ? -0.06 : 0)
          g.userData.phase = i * 1.4
          g.userData.screen = s
          slabs.add(g)
        })

        // Waveform ring
        const bars = new THREE.Group()
        root.add(bars)
        const count = 56
        const radius = 4.5
        const barGeo = new THREE.BoxGeometry(0.055, 1, 0.055)
        const barMat = new THREE.MeshStandardMaterial({ color: bright, emissive: bright, emissiveIntensity: 0.5, transparent: true, opacity: 0.75 })
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2
          const b = new THREE.Mesh(barGeo, barMat)
          b.position.set(Math.cos(a) * radius, -2.9, Math.sin(a) * radius * 0.42)
          b.userData.i = i
          bars.add(b)
        }
        bars.rotation.x = 0.1

        // Dust
        const dustGeo = new THREE.BufferGeometry()
        const pts = new Float32Array(360 * 3)
        for (let i = 0; i < 360; i++) {
          pts[i * 3] = (Math.random() - 0.5) * 22
          pts[i * 3 + 1] = (Math.random() - 0.5) * 13
          pts[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3
        }
        dustGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3))
        root.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: bright, size: 0.035, transparent: true, opacity: 0.5 })))

        // Pointer / drag
        const target = { x: 0, y: 0 }
        const cur = { x: 0, y: 0 }
        let drag = null
        let spin = 0
        const el = renderer.domElement
        onPointerMove = (e) => {
          const r = el.getBoundingClientRect()
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          if (drag !== null) {
            spin += (nx - drag) * 2.4
            drag = nx
          }
          target.x = nx
          target.y = ny
        }
        onPointerDown = (e) => {
          const r = el.getBoundingClientRect()
          drag = (e.clientX - r.left) / r.width - 0.5
          el.style.cursor = 'grabbing'
        }
        onPointerUp = () => {
          drag = null
          el.style.cursor = 'grab'
        }
        el.style.touchAction = 'none'
        el.style.cursor = 'grab'
        el.addEventListener('pointermove', onPointerMove)
        el.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('pointerup', onPointerUp)

        onResize = () => {
          const w = host.clientWidth
          const h = host.clientHeight
          renderer.setSize(w, h, false)
          camera.aspect = w / Math.max(h, 1)
          camera.fov = w < 720 ? 60 : 42
          camera.updateProjectionMatrix()
        }
        window.addEventListener('resize', onResize)
        onResize()

        const t0 = performance.now()
        const tick = () => {
          if (cancelled) return
          const t = (performance.now() - t0) / 1000
          cur.x += (target.x - cur.x) * 0.055
          cur.y += (target.y - cur.y) * 0.055
          root.rotation.y = spin + cur.x * 0.5 + Math.sin(t * 0.14) * 0.09
          root.rotation.x = -cur.y * 0.26
          bars.rotation.y = t * 0.09

          bars.children.forEach((b, i) => {
            const h = 0.3 + Math.abs(Math.sin(t * 1.5 + i * 0.42)) * 0.85 + Math.abs(Math.sin(t * 0.6 + i * 0.17)) * 0.55
            b.scale.y = h
            b.position.y = -2.9 + h / 2
          })

          slabs.children.forEach((g, i) => {
            g.position.y = (i === 1 ? 0.22 : -0.22) + Math.sin(t * 0.7 + g.userData.phase) * 0.17
            g.userData.screen.material.emissiveIntensity = 0.45 + Math.sin(t * 1.1 + i) * 0.22
          })

          renderer.render(scene, camera)
          raf = requestAnimationFrame(tick)
        }
        tick()
      })
      .catch((e) => {
        console.warn('3D hero unavailable, using flat fallback:', e && e.message)
        if (!cancelled) onFallback(true)
      })

    return () => {
      cancelled = true
      if (raf) cancelAnimationFrame(raf)
      if (onResize) window.removeEventListener('resize', onResize)
      if (onPointerUp) window.removeEventListener('pointerup', onPointerUp)
      if (renderer) {
        renderer.domElement.removeEventListener('pointermove', onPointerMove)
        renderer.domElement.removeEventListener('pointerdown', onPointerDown)
        renderer.dispose()
      }
      host.replaceChildren()
    }
  }, [onFallback])

  return <div ref={stageRef} className="absolute inset-0 z-0" />
}
