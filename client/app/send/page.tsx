"use client"

import type React from "react"

import { useState } from "react"
import { Check, Droplets, Rocket, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SparklesCore } from "@/components/sparkles"
import Navbar from "@/components/navbar"
import { abi, contracts } from "@/web3"
import { useWriteContract } from "wagmi"
import { parseEther } from "viem"
import Link from "next/link"
import { useSwitchChain } from "wagmi"


export default function CryptoFaucet() {
  const { writeContractAsync } = useWriteContract();
  const { switchChain } = useSwitchChain()
  const [selectedChain, setSelectedChain] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [tx, setTx] = useState("")

  const testnetChains = [
    { id: "eth-sepolia", name: "Ethereum Sepolia", address: contracts.ethereumSepolia, url: "https://sepolia.etherscan.io", color: "#627EEA", chainId: 11155111 },
    { id: "base-sepolia", name: "Base Sepolia", address: contracts.baseSepolia, url: "https://sepolia.basescan.org", color: "#0052FF", chainId: 84532 },
    { id: "arbitrum-sepolia", name: "Arbitrum Sepolia", address: contracts.arbitrumSepolia, url: "https://sepolia.arbiscan.io", color: "#28A0F0", chainId: 421614 },
    { id: "optimism-sepolia", name: "Optimism Sepolia", address: contracts.optimismSepolia, url: "https://https://sepolia-optimism.etherscan.io", color: "#FF0420", chainId: 11155420 },
    { id: "polygon-amoy", name: "Polygon Amoy", address: contracts.polygonAmoy, url: "https://amoy.polygonscan.com", color: "#8247E5", chainId: 80002 },
    { id: "avalanche-fuji", name: "Avalanche Fuji", address: contracts.avalancheFuji, url: "https://testnet.snowtrace.io", color: "#E84A5F", chainId: 43113 },
  ]


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedChain) {
      setError("Please select a testnet chain")
      return
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setError("")
    setIsLoading(true)

    await sendTokens()

    setIsLoading(false)
    setSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  const sendTokens = async () => {
    const addy = testnetChains.find((chain) => chain.id === selectedChain)?.address
    const tx = await writeContractAsync({
      address: addy as `0x${string}`,
      abi: abi,
      functionName: "fund",
      args: [],
      value: parseEther(`${amount}`),
      chainId: testnetChains.find((chain) => chain.id === selectedChain)?.chainId as 1 | 80002 | 11155111 | 84532 | 421614 | 11155420 | 43113,
    })

    setTx(tx)
  }

  const getChainColor = (chainId: string) => {
    return testnetChains.find((chain) => chain.id === chainId)?.color || "#627EEA"
  }

  const handleChainChange = (chainId: string) => {
    setSelectedChain(chainId)
    switchChain({
      chainId: testnetChains.find((chain) => chain.id === chainId)?.chainId as 1 | 80002 | 11155111 | 84532 | 421614 | 11155420 | 43113,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4 overflow-hidden relative">
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

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-black/40 rounded-3xl p-8 border border-gray-800 shadow-[0_0_50px_rgba(80,100,240,0.3)]">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Droplets className="h-16 w-16 text-blue-400" />
              <div className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-1">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-2">
            BeMyFaucet
          </h1>
          <p className="text-gray-400 text-center mb-8">Gimme some testnet tokens, and I&apos;ll totally pretend to owe you one!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Select Testnet</label>
              <Select value={selectedChain} onValueChange={handleChainChange}>
                <SelectTrigger
                  className="w-full bg-gray-900/60 border-gray-700 text-gray-200 h-12 rounded-xl"
                  style={{
                    borderLeft: selectedChain ? `4px solid ${getChainColor(selectedChain)}` : undefined,
                  }}
                >
                  <SelectValue placeholder="Select a testnet chain" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-gray-200">
                  {testnetChains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id} className="focus:bg-gray-800 focus:text-white">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: chain.color }} />
                        {chain.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Amount</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.05 (Or be a baller and send more. No pressure...)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-900/60 border-gray-700 text-gray-200 h-12 pl-4 pr-12 rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                {/* <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                  {selectedChain.split("-")[0].toUpperCase()}
                </div> */}
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full h-12 rounded-xl text-white font-medium transition-all duration-300 ${isLoading
                  ? "bg-gray-700"
                  : success
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : success ? (
                <div className="flex items-center justify-center gap-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>Isn&apos;t it fun being generous?</span>
                  <Link
                    href={`${testnetChains.find((chain) => chain.id === selectedChain)?.url}/tx/${tx}`}
                    target="_blank"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                  >
                    View transaction
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Send Tokens
                </div>
              )}
            </Button>

            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}

            {success && (
              <div className="text-green-500 text-sm text-center mt-2 animate-pulse">
                I owe you one, my g!
              </div>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="text-xs text-gray-500 text-center">
              <p>These are testnet tokens with no real value.</p>
              <p className="mt-1">So chill dude, I&apos;m not looting you!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

