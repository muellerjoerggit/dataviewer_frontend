import {Button} from "@/components/ui/button.tsx";
import BookmarkIcon from "@/components/icons/BookmarkIcon.tsx";

type props = {
  entityKey: string,
  isBookmarkCallback: ((entityKey: string) => boolean),
  toggleBookmark: ((entityKey: string) => void)
}

export default function Bookmark({entityKey, isBookmarkCallback, toggleBookmark}: props) {
  return (
    <Button variant="secondary" onClick={() => toggleBookmark(entityKey)}><BookmarkIcon className={isBookmarkCallback(entityKey) ? 'text-yellow-400 mr-2' : 'mr-2'}/>Lesezeichen</Button>
  )
}