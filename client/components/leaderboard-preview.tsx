"use client"

import { motion } from "framer-motion"
import { Trophy, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useReadContract } from "wagmi"
import { abi, contracts } from "@/web3"
import { useState } from "react"
import { useEffect } from "react"


export default function LeaderboardPreview() {  
  interface Funder {
    address: string
    amount: string 
    network: string
  }

  const [topFunders, setTopFunders] = useState<Funder[]>([])

  const { data: ethereumFunders, error: ethereumError } = useReadContract({
    address: contracts.ethereumSepolia as `0x${string}`,
    abi: abi,
    functionName: "get_funders",
    args: [],
    chainId: 11155111,  
  })

  const { data: baseFunders, error: baseError } = useReadContract({
    address: contracts.baseSepolia as `0x${string}`,
    abi: abi, 
    functionName: "get_funders",
    args: [],
    chainId: 84532,
  })

  const { data: arbitrumFunders, error: arbitrumError } = useReadContract({
    address: contracts.arbitrumSepolia as `0x${string}`,
    abi: abi,
    functionName: "get_funders", 
    args: [],
    chainId: 421614,
  })

  const { data: optimismFunders, error: optimismError } = useReadContract({
    address: contracts.optimismSepolia as `0x${string}`,
    abi: abi,
    functionName: "get_funders",
    args: [], 
    chainId: 11155420,
  })

  const { data: polygonFunders, error: polygonError } = useReadContract({
    address: contracts.polygonAmoy as `0x${string}`,
    abi: abi,
    functionName: "get_funders",
    args: [],
    chainId: 80002,
  })

  const { data: avalancheFunders, error: avalancheError } = useReadContract({
    address: contracts.avalancheFuji as `0x${string}`,
    abi: abi,
    functionName: "get_funders",
    args: [],
    chainId: 43113,
  })

  const fetchTopFunders = () => {
    console.log("Fetching top funders...")
    console.log("Chain errors:", {
      ethereum: ethereumError,
      base: baseError,
      arbitrum: arbitrumError,
      optimism: optimismError,
      polygon: polygonError,
      avalanche: avalancheError
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processChainData = (data: any, chainName: string) => {
      if (!Array.isArray(data)) {
        console.log(`No data for ${chainName}:`, data)
        return []
      }
      return data.map(f => ({
        address: f.addy,
        amount: (Number(f.amount) / 1e18).toString(),
        network: chainName
      }))
    }

    const allFunders = [
      ...processChainData(ethereumFunders, "Ethereum Sepolia"),
      ...processChainData(baseFunders, "Base Sepolia"),
      ...processChainData(arbitrumFunders, "Arbitrum Sepolia"),
      ...processChainData(optimismFunders, "Optimism Sepolia"),
      ...processChainData(polygonFunders, "Polygon Amoy"),
      ...processChainData(avalancheFunders, "Avalanche Fuji")
    ]

    // Sort by amount in descending order
    const sortedFunders = allFunders.sort((a, b) => {
      const amountA = Number.parseFloat(a.amount)
      const amountB = Number.parseFloat(b.amount)
      return amountB - amountA
    })

    console.log("Processed funders:", sortedFunders)
    setTopFunders(sortedFunders)
  }

  useEffect(() => {
    console.log("Chain data status:", {
      ethereum: ethereumFunders,
      base: baseFunders,
      arbitrum: arbitrumFunders,
      optimism: optimismFunders,
      polygon: polygonFunders,
      avalanche: avalancheFunders
    })
    
    // Check if any data is available
    if ([ethereumFunders, baseFunders, arbitrumFunders, optimismFunders, polygonFunders, avalancheFunders]
        .some(data => data !== undefined)) {
      fetchTopFunders()
    }
  }, [ethereumFunders, baseFunders, arbitrumFunders, optimismFunders, polygonFunders, avalancheFunders])

  return (
    <section id="leaderboard" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Top Funders</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The absolute legend madlads who have gone above and beyond to help me build the future of web3!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-500/20">
                  <th className="py-4 px-6 text-left text-white font-semibold">Rank</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Address</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Network</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Amount Funded</th>
                </tr>
              </thead>
              <tbody>
                {topFunders.slice(0, 5).map((funder, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 hover:bg-purple-500/10 transition-colors"
                  >
                    <td className="py-4 px-6 text-white/90">
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/90 font-mono">{funder.address}</td>
                    <td className="py-4 px-6 text-white/90">{funder.network}</td>
                    <td className="py-4 px-6 text-white/90">{funder.amount}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-purple-500/10 border-t border-white/10 flex justify-center">
            <Link href="#" className="text-white flex items-center hover:text-purple-200 transition-colors">
              View Full Leaderboard
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

