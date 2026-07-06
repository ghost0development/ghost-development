"use client";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import LiquidChrome from "@/components/LiquidChrome";
import AnimatedText from "@/components/AnimatedText";
import MagneticButton from "@/components/MagneticButton";
import LazyCanvas from "@/components/LazyCanvas";
import { useLenis } from "@/lib/lenis";

function StarBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const count = 6000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 80 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
      const b = 0.5 + Math.random() * 0.5;
      col[i3] = b;
      col[i3 + 1] = b * 0.7;
      col[i3 + 2] = b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.00015;
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.00008;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <pointsMaterial
        size={0.04}
        transparent
        opacity={0.8}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </Points>
  );
}

const title = "Ghost Development";

export default function Hero() {
  const { lenis } = useLenis();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id) as HTMLElement | null;
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidChrome
          baseColor={[0.03, 0.03, 0.07]}
          accentColor={[0.4, 0.15, 0.9]}
          speed={0.12}
          amplitude={0.35}
          frequencyX={2.5}
          frequencyY={1.5}
          interactive={true}
        />
      </div>
      <div className="absolute inset-0 z-1 opacity-25 pointer-events-none">
        <LazyCanvas>
          <Canvas camera={{ position: [0, 0, 1], fov: 75 }} dpr={[1, 1.5]} gl={{ antialias: false }}>
            <StarBackground />
          </Canvas>
        </LazyCanvas>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[hsl(240_10%_4%)] pointer-events-none" />
      <div className="relative z-20 flex h-screen flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-[10px] tracking-widest text-[hsl(0_0%_55%)] font-mono uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] shadow-lg shadow-[hsl(var(--primary))/0.5] animate-pulse" />
          Software House · Szczecin
        </motion.div>

        <AnimatedText
          text={title}
          as="h1"
          variant="chars"
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-tight text-gradient"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <AnimatedText
            text="Nowa Generacja Oprogramowania"
            as="p"
            variant="words"
            className="text-lg md:text-xl font-light text-[hsl(0_0%_65%)] max-w-2xl mb-10 mt-4"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton
            onClick={() => scrollTo("kontakt")}
            className="px-8 py-3.5 rounded-xl bg-[hsl(var(--primary))] text-white text-sm font-semibold hover:brightness-110 transition-all duration-300 shadow-lg shadow-[hsl(var(--primary))/0.25] hover:shadow-[hsl(var(--primary))/0.4] cursor-pointer"
          >
            Wyceń projekt
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("uslugi")}
            className="px-8 py-3.5 rounded-xl glass glass-hover text-sm font-medium tracking-wider text-white hover:bg-white/5 cursor-pointer"
          >
            Zobacz ofertę
          </MagneticButton>
        </motion.div>
      </div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        onClick={() => scrollTo("uslugi")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[hsl(0_0%_40%)] hover:text-white transition-colors font-mono text-[10px] tracking-widest uppercase flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Przewiń
        </motion.span>
        <div className="w-px h-12 bg-gradient-to-b from-[hsl(0_0%_20%)] to-transparent" />
      </motion.button>
    </section>
  );
}
