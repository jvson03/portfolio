"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoveRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  link: string
}

export function ProjectCard({ title, description, tags, image, link }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={link}
      target="_blank"
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-primary/20 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold transition-colors group-hover:text-primary">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-secondary/50 transition-colors hover:bg-secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-sm text-primary font-medium">
              <span>View Project</span>
              <MoveRight
                className={cn(
                  "ml-1 h-4 w-4 transition-transform duration-300",
                  isHovered ? "translate-x-2" : "translate-x-0",
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

