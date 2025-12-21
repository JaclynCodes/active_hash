"use client"

import { useEffect, useRef } from "react"

interface Node {
  id: string
  label: string
  color: string
  x: number
  y: number
  radius: number
}

interface Connection {
  from: string
  to: string
  color: string
}

const LENS_1_NODES: Node[] = [
  { id: "guardian", label: "Guardian", color: "#22c55e", x: 100, y: 200, radius: 45 },
  { id: "weaver", label: "Weaver", color: "#a855f7", x: 280, y: 200, radius: 45 },
  { id: "chronicler", label: "Chronicler", color: "#0ea5e9", x: 460, y: 200, radius: 45 },
  { id: "shadow", label: "Shadow", color: "#f87171", x: 640, y: 200, radius: 45 },
  { id: "council", label: "Council", color: "#22c55e", x: 820, y: 200, radius: 45 },
]

const LENS_1_CONNECTIONS: Connection[] = [
  { from: "guardian", to: "weaver", color: "#6b7280" },
  { from: "weaver", to: "chronicler", color: "#6b7280" },
  { from: "chronicler", to: "shadow", color: "#6b7280" },
  { from: "shadow", to: "council", color: "#6b7280" },
]

const LENS_2_NODES: Node[] = [
  { id: "decision", label: "Decision", color: "#fbbf24", x: 100, y: 450, radius: 40 },
  { id: "minutes1", label: "Minutes", color: "#60a5fa", x: 210, y: 450, radius: 40 },
  { id: "minutes2", label: "Minutes", color: "#60a5fa", x: 320, y: 450, radius: 40 },
  { id: "dreaming", label: "Dreaming", color: "#22c55e", x: 430, y: 450, radius: 40 },
  { id: "myths1", label: "Myths", color: "#22c55e", x: 540, y: 450, radius: 40 },
  { id: "myths2", label: "Myths", color: "#60a5fa", x: 650, y: 450, radius: 40 },
  { id: "metric", label: "Metric", color: "#f87171", x: 760, y: 450, radius: 40 },
  { id: "creep", label: "Creep", color: "#fbbf24", x: 870, y: 450, radius: 40 },
]

const LENS_2_CONNECTIONS: Connection[] = [
  { from: "decision", to: "minutes1", color: "#6b7280" },
  { from: "minutes1", to: "minutes2", color: "#6b7280" },
  { from: "minutes2", to: "dreaming", color: "#6b7280" },
  { from: "dreaming", to: "myths1", color: "#6b7280" },
  { from: "myths1", to: "myths2", color: "#6b7280" },
  { from: "myths2", to: "metric", color: "#6b7280" },
  { from: "metric", to: "creep", color: "#6b7280" },
]

export function DualLens() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    // Clear canvas
    ctx.fillStyle = "rgba(10, 10, 10, 1)"
    ctx.fillRect(0, 0, width, height)

    // Draw particles/stars in background
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      ctx.fillRect(x, y, 1, 1)
    }

    // Draw connections
    const drawConnections = (connections: Connection[], nodes: Node[]) => {
      connections.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from)
        const toNode = nodes.find((n) => n.id === conn.to)
        if (!fromNode || !toNode) return

        ctx.strokeStyle = conn.color
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.stroke()
        ctx.setLineDash([])
      })
    }

    // Draw nodes
    const drawNodes = (nodes: Node[]) => {
      nodes.forEach((node) => {
        // Glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius + 10)
        gradient.addColorStop(0, `${node.color}40`)
        gradient.addColorStop(1, `${node.color}00`)
        ctx.fillStyle = gradient
        ctx.fillRect(
          node.x - node.radius - 10,
          node.y - node.radius - 10,
          (node.radius + 10) * 2,
          (node.radius + 10) * 2,
        )

        // Circle border
        ctx.strokeStyle = node.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.stroke()

        // Label
        ctx.fillStyle = node.color
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.label, node.x, node.y)
      })
    }

    // Adjust positions based on screen width
    const scale = width / 1000
    const scaledLens1 = LENS_1_NODES.map((n) => ({ ...n, x: n.x * scale, y: n.y * scale }))
    const scaledLens2 = LENS_2_NODES.map((n) => ({ ...n, x: n.x * scale, y: n.y * scale + 150 }))

    drawConnections(LENS_1_CONNECTIONS, scaledLens1)
    drawConnections(LENS_2_CONNECTIONS, scaledLens2)
    drawNodes(scaledLens1)
    drawNodes(scaledLens2)
  }, [])

  return (
    <section id="lenses" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">The Dual-Lens Codex</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Atlas visualizes complex systems through two complementary perspectives
          </p>
        </div>

        <div className="mb-16 overflow-hidden rounded-lg border border-border bg-card">
          <canvas ref={canvasRef} className="h-96 w-full" width={1000} height={600} />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gestalt/30 bg-gestalt/5 p-6">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <div className="h-3 w-3 rounded-full bg-gestalt" />
              Lens 1: The Actor Loop
            </h3>
            <p className="text-sm text-muted-foreground">
              Guardian, Weaver, Chronicler, Shadow, and Council form the core system participants. Each plays a distinct
              role in the actor ecosystem, creating a feedback loop of influence and responsibility.
            </p>
          </div>

          <div className="rounded-lg border border-creep/30 bg-creep/5 p-6">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <div className="h-3 w-3 rounded-full bg-creep" />
              Lens 2: The Chemistry Flow
            </h3>
            <p className="text-sm text-muted-foreground">
              Decision, Minutes, Dreaming, Myths, and Metrics create the chemical reactions that power the system. This
              lens reveals how abstract concepts crystallize into measurable outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
