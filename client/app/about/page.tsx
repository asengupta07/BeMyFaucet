"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Mail, ExternalLink, Code, Zap, Coffee } from "lucide-react"
import { SparklesCore } from "@/components/sparkles"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutMe() {
    return (
        <>
            <section className="min-h-screen flex items-center justify-center pt-16 px-4 bg-gradient-to-br from-gray-900 to-black">
                <Navbar />
                {/* Particle background */}
                <div className="h-full w-full absolute inset-0 z-0">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
                <div className="container mx-auto mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Me</span>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl mb-10"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-yellow-300 to-pink-300 flex-shrink-0"
                                >
                                    <img src="/ME.jpg" alt="Profile" className="w-full h-full object-cover" />
                                </motion.div>

                                <div className="flex-1">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="text-2xl md:text-3xl font-bold text-white mb-3"
                                    >
                                        Arnab Sengupta
                                    </motion.h2>

                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 mb-4"
                                    >
                                        AI Developer & Web3 Enthusiast
                                    </motion.h3>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        className="text-white/80 mb-4"
                                    >
                                        I&apos;m a passionate AI developer with expertise in Machine Learning, Deep Learning, NLP and building AI Agents, specializing in Multi-Agent Architectures. Also a Web3 enthusiast, I have a keen interest in the advent of AI Agents in the Web3 space and the awesome DApps that can be built in this intersection. Always eager to learn new things and build cool stuff!
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.7 }}
                                        className="text-white/80"
                                    >
                                        When I&apos;m not coding the next big thing, I&apos;m either gaming on my PS5, listening to music or exploring new places around the city with my friends!
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
                        >
                            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                    <Code className="mr-2 h-5 w-5 text-yellow-300" />
                                    Skills
                                </h3>
                                <ul className="space-y-2 text-white/80">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></span>
                                        Machine Learning
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-pink-300 rounded-full mr-2"></span>
                                        Deep Learning
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></span>
                                        AI Agent Building
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-pink-300 rounded-full mr-2"></span>
                                        Smart Contract Development with Solidity & Vyper
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></span>
                                        Web3.js & Ethers.js
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-pink-300 rounded-full mr-2"></span>
                                        React & Next.js
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                    <Zap className="mr-2 h-5 w-5 text-pink-300" />
                                    Experience
                                </h3>
                                <ul className="space-y-4 text-white/80">
                                    <li>
                                        <p className="font-medium text-white">AI/ML Engineer</p>
                                        <p className="text-sm text-white/60">Alchemyst AI • 2024 - Present</p>
                                    </li>
                                    <li>
                                        <p className="font-medium text-white">AI/ML Domain Lead</p>
                                        <p className="text-sm text-white/60">GDG on Campus HITK • 2024 - Present</p>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg mb-10"
                        >
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Coffee className="mr-2 h-5 w-5 text-yellow-300" />
                                Fun Facts
                            </h3>
                            <ul className="space-y-2 text-white/80">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full mr-2"></span>
                                    Won 3 major web3 hackathons in the last year, and a total of 5 hackathons in the last 2 years
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full mr-2"></span>
                                    Collected over 15k USD in prizes from hackathons
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full mr-2"></span>
                                    Built a total of 10+ Projects in the last 2 years
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-wrap justify-center gap-4 mb-10"
                        >
                            <motion.a
                                href="https://github.com/asengupta07"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors"
                            >
                                <Github className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href="https://x.com/ArnabS6"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors"
                            >
                                <Twitter className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/asengupta07/"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors"
                            >
                                <Linkedin className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href="mailto:arnabsengupta104@gmail.com"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors"
                            >
                                <Mail className="h-6 w-6" />
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="text-center mb-10"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-yellow-300 to-pink-300 text-purple-900 hover:from-yellow-200 hover:to-pink-200 text-lg px-8 py-6 rounded-full shadow-glow"
                                onClick={() => window.open("https://wa.me/918910201104?text=Hey!", "_blank")}
                            >
                                Contact Me
                                <ExternalLink className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </>
    )
}

