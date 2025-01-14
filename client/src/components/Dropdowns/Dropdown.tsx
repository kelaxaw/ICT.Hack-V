import React, { FC, useState } from "react"
import { Arrow } from "../Icons/Arrow"
import { DropdownOption } from "./DropdownOption"

type TDropdown = {
  title: string
  data: any[]
  selectOption: string
  option: string
  onSelect: React.Dispatch<React.SetStateAction<string>>
}

export const Dropdown: FC<TDropdown> = ({
  selectOption,
  title,
  data,
  onSelect,
  select,
}) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpenDropdown = () => {
    setIsOpened(!isOpened)
  }

  const isArrowRotate = `transition-transform duration-500 ${
    isOpened && "rotate-180"
  }`

  return (
    <div className='p-[10px] rounded-[10px] cursor-pointer transition-colors duration-300'>
      <div
        onClick={handleOpenDropdown}
        className='flex justify-between w-full items-center'
      >
        <span className='font-bold text-xl text-white'>{title}</span>
        <div className={isArrowRotate}>
          <Arrow />
        </div>
      </div>

      {isOpened && (
        <div className='flex flex-col gap-y-2'>
          {data
            ? data.map((option) => (
                <DropdownOption
                  select={select}
                  selectOption={option[selectOption]}
                  onSelect={onSelect}
                  name={option.name}
                />
              ))
            : null}
        </div>
      )}
    </div>
  )
}
