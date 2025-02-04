"use client"

import { Tag } from "@/components/ui/tag"

type TagsProps = {
    tags: string[]
    selectedTags?: string[]
    onTagSelect?: (tag: string) => void
    disabled?: boolean
}

export function Tags({ 
    tags, 
    selectedTags = [], 
    onTagSelect, 
    disabled = false 
}: TagsProps) {
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
                    variant={selectedTags.includes(tag) ? "solid" : "outline"}
                    cursor="pointer"
                    onClick={() => onTagSelect?.(tag)}
                    _hover={{ opacity: 0.8 }}
                >
                    {tag}
                </Tag>
            ))}
        </div>
    )
}