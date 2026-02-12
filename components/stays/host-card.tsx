import Image from "next/image";
import { Shield, MessageCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { Host } from "@/lib/types";

interface HostCardProps {
  host: Host;
}

export function HostCard({ host }: HostCardProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
      <div className="flex items-start gap-4">
        {/* Host Avatar */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image
            src={host.avatar}
            alt={`${host.name}'s profile photo`}
            fill
            sizes="64px"
            className="object-cover"
          />
          {host.isSuperhost && (
            <div
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600"
              aria-label="Superhost"
            >
              <Shield className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Host Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{host.name}</h3>
            {host.isSuperhost && (
              <Badge variant="default" className="text-xs">
                Superhost
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-neutral-400">
            Hosting since {formatDate(host.joinedDate)}
          </p>
        </div>
      </div>

      {/* Host Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-neutral-300">
          <Clock className="h-4 w-4 text-neutral-500" aria-hidden="true" />
          <span className="text-sm">{host.responseRate}% response rate</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-300">
          <MessageCircle className="h-4 w-4 text-neutral-500" aria-hidden="true" />
          <span className="text-sm">Quick responder</span>
        </div>
      </div>

      {/* Contact Button */}
      <Button variant="outline" className="mt-6 w-full">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Contact Host
      </Button>

      {/* Safety Notice */}
      <p className="mt-4 text-xs text-neutral-500">
        To protect your payment, never transfer money or communicate outside of
        the Arrivo website or app.
      </p>
    </div>
  );
}
