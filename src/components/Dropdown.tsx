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
import { Theme } from "@chakra-ui/react"
import { useEffect } from "react"

interface DropdownProps {
  setSortVal: (value: string) => void; 
}

const Dropdown: React.FC<DropdownProps> = ({setSortVal}) => {
  const [value, setValue] = useState("desc_match")

  
  
  // If value changes, change sortVal value correspondingly
  useEffect(() => {
    setSortVal(value);
  }, [value])

  return (
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-lg bg-white px-2">
              <HiSortAscending /> Sort by 
            </Button>
          </MenuTrigger>
          <Theme appearance="light">
            <MenuContent minW="10rem" className="bg-white">
              <Theme appearance="light">
                <MenuRadioItemGroup
                  value={value}
                  onValueChange={(e) => setValue(e.value)}
                >
                <MenuRadioItem value="asc_price" className="py-1 px-2">Price Low to High</MenuRadioItem>
                <MenuRadioItem value="desc_price" className="py-1 px-2">Price High to Low</MenuRadioItem>
                <MenuRadioItem value="asc_match" className="py-1 px-2">Match Low to High</MenuRadioItem>
                <MenuRadioItem value="desc_match" className="py-1 px-2">Match High to Low</MenuRadioItem>
              </MenuRadioItemGroup>
              </Theme>
            </MenuContent>
            </Theme>
        </MenuRoot>
  )
}

export default Dropdown;