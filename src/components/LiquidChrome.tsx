"use client";
import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./LiquidChrome.css";

interface LiquidChromeProps {
  baseColor?: [number, number, number];
  accentColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
}

export default function LiquidChrome({
  baseColor = [0.04, 0.04, 0.08],
  accentColor = [0.3, 0.1, 0.8],
  speed = 0.15,
  amplitude = 0.35,
  frequencyX = 2.5,
  frequencyY = 1.5,
  interactive = true,
}: LiquidChromeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const renderer = new Renderer({ antialias: true, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform vec3 uAccentColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
        return a + b * cos(6.28318 * (c * t + d));
      }

      vec4 renderImage(vec2 uvCoord) {
        vec2 fragCoord = uvCoord * uResolution.xy;
        vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

        for (float i = 1.0; i < 8.0; i++){
          uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 6.28318);
          uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 6.28318);
        }

        vec2 diff = (uvCoord - uMouse);
        float dist = length(diff);
        float falloff = exp(-dist * 15.0);
        float ripple = sin(8.0 * dist - uTime * 3.0) * 0.04;
        uv += (diff / (dist + 0.0001)) * ripple * falloff;

        float d = sin(uv.x * 2.0 + uv.y * 1.5 + uTime * 0.5) * cos(uv.y * 1.8 - uv.x * 1.2 + uTime * 0.3);
        vec3 col = palette(
          d * 0.5 + 0.5,
          uBaseColor,
          uAccentColor * 0.3,
          vec3(0.5, 0.5, 0.3),
          vec3(0.2, 0.3, 0.6)
        );
        col += uBaseColor * 0.5;
        col = col / (col + 1.0);
        return vec4(col, 1.0);
      }

      void main() {
        vec4 col = vec4(0.0);
        for (int i = -1; i <= 1; i++){
          for (int j = -1; j <= 1; j++){
            vec2 offset = vec2(float(i), float(j)) * (0.7 / min(uResolution.x, uResolution.y));
            col += renderImage(vUv + offset);
          }
        }
        gl_FragColor = col / 9.0;
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAccentColor: { value: new Float32Array(accentColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0.5, 0.5]) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      const resUniform = program.uniforms.uResolution.value as Float32Array;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    }
    window.addEventListener("resize", resize);
    resize();

    let mouseX = 0.5, mouseY = 0.5;
    let targetX = 0.5, targetY = 0.5;

    function handleMouseMove(event: MouseEvent) {
      const rect = container.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width;
      targetY = 1 - (event.clientY - rect.top) / rect.height;
    }
    function handleTouchMove(event: TouchEvent) {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        targetX = (touch.clientX - rect.left) / rect.width;
        targetY = 1 - (touch.clientY - rect.top) / rect.height;
      }
    }
    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchmove", handleTouchMove);
    }

    let animationId: number;
    function update(t: number) {
      animationId = requestAnimationFrame(update);
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      (program.uniforms.uTime.value as number) = t * 0.001 * speed;
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = mouseX;
      mouseUniform[1] = mouseY;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);
    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchmove", handleTouchMove);
      }
      if (gl.canvas.parentElement) gl.canvas.parentElement.removeChild(gl.canvas);
    };
  }, [baseColor, accentColor, speed, amplitude, frequencyX, frequencyY, interactive]);

  return <div ref={containerRef} className="liquidChrome-container" />;
}
