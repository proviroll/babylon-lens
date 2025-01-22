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
import { type FinalityProvider } from "@/types/finality-provider";
import { Copy, ExternalLink } from "lucide-react";

interface FinalityProvidersListProps {
  providers: FinalityProvider[];
}

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
      <Copy className="h-3.5 w-3.5 text-foreground/30" />
    </Button>
  );
};

export function FinalityProvidersList({
  providers,
}: FinalityProvidersListProps) {
  console.log(providers);
  return (
    <div className="hidden w-full max-w-[1440px] lg:block">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Moniker</TableHead>
              <TableHead className="w-[200px]">Commission</TableHead>
              <TableHead className="w-[300px]">Address</TableHead>
              <TableHead className="w-[150px]">Height</TableHead>
              <TableHead>Last Voted Height</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider) => (
              <TableRow key={provider.addr}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {provider.description.moniker}
                    {provider.description.website && (
                      <a
                        href={provider.description.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {(Number(provider.commission) / 1e16).toFixed(2)}%
                </TableCell>
                <TableCell className="font-mono">
                  <div className="flex max-w-sm items-center gap-2 truncate text-teal-600">
                    {provider.addr.slice(0, 12)}...{provider.addr.slice(-8)}
                    <CopyButton text={provider.addr} />
                  </div>
                </TableCell>
                <TableCell>
                  {provider.height
                    ? parseInt(provider.height).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  {provider.highestVotedHeight
                    ? provider.highestVotedHeight.toLocaleString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
