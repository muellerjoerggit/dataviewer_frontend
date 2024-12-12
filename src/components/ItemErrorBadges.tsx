import {Badge} from "@/components/ui/badge.tsx";

type props = {
  criticalError: Boolean,
  warningError: Boolean
}

export default function ItemErrorBadges({criticalError, warningError}: props) {

  return (
    <>
      {criticalError ? <Badge className="ml-2 bg-red-700">!</Badge> : ''}
      {warningError ? <Badge className="ml-2 bg-yellow-400 text-foreground">!</Badge> : ''}
    </>
  )

}