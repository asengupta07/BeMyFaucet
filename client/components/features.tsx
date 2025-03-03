"use client"

import { motion } from "framer-motion"
import { Layers, Send, Award } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Layers className="h-10 w-10 text-blue-300" />,
      title: "Select a Chain",
      description: "Maybe I asked for a specific chain, maybe I didn't. Either way, I'll take any chain you're willing to send from.",
      delay: 0,
    },
    {
      icon: <Send className="h-10 w-10 text-pink-300" />,
      title: "Enter Amount",
      description: "I'm not greedy, I'll take any amount you're willing to send!",
      delay: 0.2,
    },
    {
      icon: <Award className="h-10 w-10 text-yellow-300" />,
      title: "Become a True Crypto Hero!",
      description: "Look at you, sending me testnet tokens like it's nothing. Your addy looks sweet on that leaderboard!",
      delay: 0.4,
    },
  ]

  return (
    <section id="faucet" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            It's simple, really. You send me some testnet tokens, and I'll add your address to the leaderboard. Not rocket science, I promise!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
            >
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h3>
              <p className="text-white/70 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          {/* <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 p-[1px] rounded-lg">
            <div className="bg-black/30 backdrop-blur-lg rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to try it yourself?</h3>
              <p className="text-white/70 mb-6">Connect your wallet and start receiving testnet tokens in seconds.</p>
              <button className="bg-white text-purple-600 hover:bg-white/90 font-medium py-2 px-6 rounded-lg transition-all">
                Launch Faucet
              </button>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  )
}

