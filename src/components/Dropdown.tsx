import { Button } from "@/components/ui/button"
import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { useState } from "react"
import { HiSortAscending } from "react-icons/hi"

const Dropdown = () => {
  const [value, setValue] = useState("asc")
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          <HiSortAscending /> Sort
        </Button>
      </MenuTrigger>
      <MenuContent minW="10rem">
        <MenuRadioItemGroup
          value={value}
          onValueChange={(e) => setValue(e.value)}
        >
          <MenuRadioItem value="asc">Ascending</MenuRadioItem>
          <MenuRadioItem value="desc">Descending</MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}

export default Dropdown;