import {Button} from "@/components/ui/button.tsx";
import BookmarkIcon from "@/components/icons/BookmarkIcon.tsx";

type props = {
  entityKey: string,
  bookmarks: Array<string>,
  setBookmarksCallback: ((bookmarks: Array<string>) => void)
}

export default function Bookmark({entityKey, bookmarks, setBookmarksCallback}: props) {

  function toggleBookmark() {
    let newBookmarks: Array<string> = [];
    if(isBookmarked()) {
      newBookmarks = bookmarks.filter((value) => entityKey != value);
    } else {
      newBookmarks = [...bookmarks, entityKey];
    }

    setBookmarksCallback(newBookmarks);
  }

  function isBookmarked() {
    return !!bookmarks.find((value: string) => value === entityKey)
  }

  return (
    <Button variant="ghost" onClick={() => toggleBookmark()}>
      <BookmarkIcon className={isBookmarked() ? 'text-yellow-400' : ''}/>
    </Button>
  )
}