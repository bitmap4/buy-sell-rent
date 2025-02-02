"use client"

import { Tag } from "@/components/ui/tag"
import { useState } from 'react'

type TagsProps = {
    tags: string[],
    disabled?: boolean
}

export function Tags({ tags, disabled = false }: TagsProps) {
    const [clickedTags, setClickedTags] = useState<Set<string>>(new Set())

    const handleClick = (tag: string) => {
        setClickedTags(prev => {
            const newSet = new Set(prev)
            if (newSet.has(tag)) {
                newSet.delete(tag)
            } else {
                newSet.add(tag)
            }
            return newSet
        })
        console.log(`Tag clicked: ${tag}`)
        // Add your click handler logic here
    }

    if (disabled) {
        return (
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        size="md"
                        variant="solid"
                        _hover={{ opacity: 0.8 }}
                    >
                        {tag}
                    </Tag>
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Tag
                    key={tag}
                    size="md"
                    variant={clickedTags.has(tag) ? "solid" : "outline"}
                    cursor="pointer"
                    onClick={() => handleClick(tag)}
                    _hover={{ opacity: 0.8 }}
                >
                    {tag}
                </Tag>
            ))}
        </div>
    )
}