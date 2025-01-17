"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpDown, CheckCircle, Clock, Copy, XCircle } from "lucide-react";

// Mock data
const validators = [
  {
    name: "Validator Alpha",
    address: "rdx1qsp...8j4m3",
    totalStake: "2,450,000 XRD",
    ownerStake: "245,000 XRD",
    apy: "11.2%",
    fee: "2%",
    uptime: "99.98%",
    timespan: "30d",
    acceptingStake: true,
    jailed: false,
  },
  {
    name: "Validator Beta",
    address: "rdx1abc...9k2n4",
    totalStake: "1,890,000 XRD",
    ownerStake: "189,000 XRD",
    apy: "10.8%",
    fee: "2.5%",
    uptime: "99.95%",
    timespan: "30d",
    acceptingStake: true,
    jailed: true,
  },
  {
    name: "Validator Gamma",
    address: "rdx1xyz...5m7p8",
    totalStake: "3,200,000 XRD",
    ownerStake: "320,000 XRD",
    apy: "10.5%",
    fee: "1.8%",
    uptime: "99.99%",
    timespan: "30d",
    acceptingStake: false,
    jailed: false,
  },
  {
    name: "Validator Delta",
    address: "rdx1def...2h6j9",
    totalStake: "1,750,000 XRD",
    ownerStake: "175,000 XRD",
    apy: "11.5%",
    fee: "2.2%",
    uptime: "99.90%",
    timespan: "30d",
    acceptingStake: true,
    jailed: false,
  },
  {
    name: "Validator Epsilon",
    address: "rdx1ghi...4n8r3",
    totalStake: "2,900,000 XRD",
    ownerStake: "290,000 XRD",
    apy: "10.9%",
    fee: "2.1%",
    uptime: "99.97%",
    timespan: "30d",
    acceptingStake: false,
    jailed: false,
  },
];

const CopyButton = ({ text }: { text: string }) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast({
      description: "Address copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6 p-0"
      onClick={handleCopy}
    >
      <Copy className="h-4 w-4" />
    </Button>
  );
};

export default function Home() {
  return (
    <main className="mx-auto my-48 flex min-h-screen max-w-6xl flex-col">
      <div className="container mx-auto">
        <h1 className="mb-8 text-3xl font-bold">Network Staking</h1>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  Validator
                  <ArrowUpDown className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">
                  Total Stake
                  <ArrowUpDown className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead className="text-right">
                  Owner Stake
                  <ArrowUpDown className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead className="text-right">
                  APY
                  <ArrowUpDown className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead className="text-right">
                  Fee
                  <ArrowUpDown className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead className="text-right">
                  Uptime
                  <Clock className="ml-2 inline-block h-4 w-4" />
                </TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Jailed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validators.map((validator) => (
                <TableRow key={validator.address}>
                  <TableCell className="font-medium">
                    {validator.name}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2">
                      {validator.address}
                      <CopyButton text={validator.address} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {validator.totalStake}
                  </TableCell>
                  <TableCell className="text-right">
                    {validator.ownerStake}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {validator.apy}
                  </TableCell>
                  <TableCell className="text-right">{validator.fee}</TableCell>
                  <TableCell className="text-right">
                    {validator.uptime}
                  </TableCell>
                  <TableCell className="text-center">
                    {validator.acceptingStake ? (
                      <Badge className="w-20 bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 inline-block h-4 w-4" />
                        Active
                      </Badge>
                    ) : (
                      <Badge className="w-20 bg-red-100 text-red-800">
                        <XCircle className="mr-1 inline-block h-4 w-4" />
                        Full
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={
                        validator.jailed
                          ? "w-20 bg-yellow-100 text-yellow-800"
                          : "w-20 bg-gray-100 text-gray-800"
                      }
                    >
                      {validator.jailed ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
