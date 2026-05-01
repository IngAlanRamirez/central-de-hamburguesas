'use client'

import { motion } from 'framer-motion'

export function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent origin-left"
    />
  )
}
