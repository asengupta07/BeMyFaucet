"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Twitter, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-white/10 backdrop-blur-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0"
          >
            <p className="text-white/70 flex items-center">
              Crafted with <Heart className="h-4 w-4 text-pink-500 mx-1" /> by{" "}
              <span className="font-medium text-white ml-1">Arnab S</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex space-x-8"
          >
            <p className="text-white/50 text-sm">Join in on the glorious joy of sending me testnet tokens! Be a true crypto hero on my web3 journey!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex space-x-4 mt-6 md:mt-0"
          >
            <Link
              href="https://github.com/asengupta07/bemyfaucet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/ArnabS6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

