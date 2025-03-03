"use client"

import { motion } from "framer-motion"
import { Trophy, Search, Filter, ExternalLink, ChevronDown, X } from "lucide-react"
import { useAccount } from "wagmi"
import { useReadContract } from "wagmi"
import { abi, contracts } from "@/web3"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"
import Footer from "@/components/footer"

export default function LeaderboardPage() {
  const { address } = useAccount()

  interface Funder {
    address: string
    amount: string
    network: string
  }

  const [topFunders, setTopFunders] = useState<Funder[]>([])
  const [filteredFunders, setFilteredFunders] = useState<Funder[]>([])
  const [selectedChain, setSelectedChain] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const testnetChains = [
    {
      id: "eth-sepolia",
      name: "Ethereum Sepolia",
      address: contracts.ethereumSepolia,
      url: "https://sepolia.etherscan.io",
      color: "#627EEA",
    },
    {
      id: "base-sepolia",
      name: "Base Sepolia",
      address: contracts.baseSepolia,
      url: "https://sepolia.basescan.org",
      color: "#0052FF",
    },
    {
      id: "arbitrum-sepolia",
      name: "Arbitrum Sepolia",
      address: contracts.arbitrumSepolia,
      url: "https://sepolia.arbiscan.io",
      color: "#28A0F0",
    },
    {
      id: "optimism-sepolia",
      name: "Optimism Sepolia",
      address: contracts.optimismSepolia,
      url: "https://sepolia-optimism.etherscan.io",
      color: "#FF0420",
    },
    {
      id: "polygon-amoy",
      name: "Polygon Amoy",
      address: contracts.polygonAmoy,
      url: "https://amoy.polygonscan.com",
      color: "#8247E5",
    },
    {
      id: "avalanche-fuji",
      name: "Avalanche Fuji",
      address: contracts.avalancheFuji,
      url: "https://testnet.snowtrace.io",
      color: "#E84A5F",
    },
  ]

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
    setIsLoading(true)
    console.log("Fetching top funders...")

    const processChainData = (data: any, chainName: string) => {
      if (!Array.isArray(data)) {
        console.log(`No data for ${chainName}:`, data)
        return []
      }
      return data.map((f) => ({
        address: f.addy,
        amount: (Number(f.amount) / 1e18).toString(),
        network: chainName,
      }))
    }

    const allFunders = [
      ...processChainData(ethereumFunders, "Ethereum Sepolia"),
      ...processChainData(baseFunders, "Base Sepolia"),
      ...processChainData(arbitrumFunders, "Arbitrum Sepolia"),
      ...processChainData(optimismFunders, "Optimism Sepolia"),
      ...processChainData(polygonFunders, "Polygon Amoy"),
      ...processChainData(avalancheFunders, "Avalanche Fuji"),
    ]

    // Sort by amount in descending order
    const sortedFunders = allFunders.sort((a, b) => {
      const amountA = Number.parseFloat(a.amount)
      const amountB = Number.parseFloat(b.amount)
      return amountB - amountA
    })

    console.log("Processed funders:", sortedFunders)
    setTopFunders(sortedFunders)
    setFilteredFunders(sortedFunders)
    setIsLoading(false)
  }

  useEffect(() => {
    // Check if any data is available
    if (
      [ethereumFunders, baseFunders, arbitrumFunders, optimismFunders, polygonFunders, avalancheFunders].some(
        (data) => data !== undefined,
      )
    ) {
      fetchTopFunders()
    }
  }, [ethereumFunders, baseFunders, arbitrumFunders, optimismFunders, polygonFunders, avalancheFunders])

  useEffect(() => {
    // Apply filters whenever selectedChain or searchQuery changes
    let filtered = [...topFunders]

    // Filter by chain
    if (selectedChain !== "all") {
      filtered = filtered.filter((funder) => {
        const chainName = testnetChains.find((chain) => chain.id === selectedChain)?.name
        return funder.network === chainName
      })
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((funder) => funder.address.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setFilteredFunders(filtered)
  }, [selectedChain, searchQuery, topFunders])

  const getChainColor = (networkName: string) => {
    const chain = testnetChains.find((chain) => chain.name === networkName)
    return chain?.color || "#627EEA"
  }

  const getChainUrl = (networkName: string, address: string) => {
    const chain = testnetChains.find((chain) => chain.name === networkName)
    return chain ? `${chain.url}/address/${address}` : "#"
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const handleChainSelect = (chainId: string) => {
    setSelectedChain(chainId)
    setIsFilterOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />

       {/* Particle background */}
       <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={2}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl mt-16 md:text-4xl font-bold text-white mb-4">Top Funders</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            These absolute legends have sent me the most testnet tokens. Join them and help me build the future of web3!
          </p>
          {/* Search Bar and Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full sm:w-48 py-2 px-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedChain === "all"
                    ? "All Chains"
                    : testnetChains.find((chain) => chain.id === selectedChain)?.name || "All Chains"}
                </div>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>

              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-gray-900 border border-white/20 rounded-lg shadow-xl z-20"
                >
                  <ul>
                    <li>
                      <button
                        onClick={() => handleChainSelect("all")}
                        className={`w-full text-left px-4 py-3 hover:bg-purple-500/20 transition-colors flex items-center ${
                          selectedChain === "all" ? "bg-purple-500/30" : ""
                        }`}
                      >
                        All Chains
                      </button>
                    </li>
                    {testnetChains.map((chain) => (
                      <li key={chain.id}>
                        <button
                          onClick={() => handleChainSelect(chain.id)}
                          className={`w-full text-left px-4 py-3 hover:bg-purple-500/20 transition-colors flex items-center ${
                            selectedChain === chain.id ? "bg-purple-500/30" : ""
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: chain.color }}></span>
                          {chain.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6"
          >
            <h3 className="text-white/70 text-sm mb-2">Total Funders</h3>
            <p className="text-3xl font-bold">{topFunders.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6"
          >
            <h3 className="text-white/70 text-sm mb-2">Total Networks</h3>
            <p className="text-3xl font-bold">{testnetChains.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6"
          >
            <h3 className="text-white/70 text-sm mb-2">Total Funded</h3>
            <p className="text-3xl font-bold">
              {topFunders.reduce((sum, funder) => sum + Number.parseFloat(funder.amount), 0).toFixed(2)}
            </p>
          </motion.div>
        </div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : filteredFunders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/70 text-lg">No funders found for the selected filters</p>
              <button
                onClick={() => {
                  setSelectedChain("all")
                  setSearchQuery("")
                }}
                className="mt-4 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-500/20">
                    <th className="py-4 px-6 text-left text-white font-semibold">Rank</th>
                    <th className="py-4 px-6 text-left text-white font-semibold">Address</th>
                    <th className="py-4 px-6 text-left text-white font-semibold">Network</th>
                    <th className="py-4 px-6 text-left text-white font-semibold">Amount Funded</th>
                    <th className="py-4 px-6 text-left text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFunders.map((funder, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="border-t border-white/10 hover:bg-purple-500/10 transition-colors"
                    >
                      <td className="py-4 px-6 text-white/90">
                        <div className="flex items-center">
                          {index === 0 && <Trophy className="h-5 w-5 text-yellow-400 mr-2" />}
                          {index === 1 && <Trophy className="h-5 w-5 text-gray-300 mr-2" />}
                          {index === 2 && <Trophy className="h-5 w-5 text-amber-600 mr-2" />}
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-white/90 font-mono">
                        <div className="flex items-center">
                          <span className="hidden md:inline">{funder.address}</span>
                          <span className="md:hidden">{formatAddress(funder.address)}</span>
                          {address === funder.address && (
                            <span className="ml-2 px-2 py-1 text-xs bg-purple-500/30 rounded-full">You</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-white/90">
                        <div className="flex items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: getChainColor(funder.network) }}
                          ></span>
                          {funder.network}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-white/90 font-medium">
                        {Number.parseFloat(funder.amount).toFixed(4)}
                      </td>
                      <td className="py-4 px-6">
                        <a
                          href={getChainUrl(funder.network, funder.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="p-4 bg-purple-500/10 border-t border-white/10 flex justify-between items-center">
            <div className="text-white/70 text-sm">
              Showing <span className="font-medium">{filteredFunders.length}</span> of{" "}
              <span className="font-medium">{topFunders.length}</span> funders
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      {/* <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-white/50 text-sm">Join in on the glorious joy of sending me testnet tokens! Be a true crypto hero on my web3 journey!</p>
        </div>
      </footer> */}
      <Footer />
    </div>
  )
}

