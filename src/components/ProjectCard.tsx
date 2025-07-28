import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  github2?: string;
  live?: string;
  image?: string;
  onImageClick?: (image: string) => void;
}

export default function ProjectCard({ 
  title, 
  description, 
  tech, 
  github, 
  live, 
  github2, 
  image,
  onImageClick 
}: ProjectCardProps) {
  return (
    <div className="group bg-gray-900 p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 flex flex-col h-full">
      {image && (
        <div 
          className="mb-4 overflow-hidden rounded-lg relative group/image"
          onClick={() => onImageClick?.(image)}
        >
          <img 
            src={image} 
            alt={title} 
            loading="lazy"
            className="w-full h-64 object-contain bg-gray-800 transition-all duration-300 cursor-zoom-in
                     group-hover/image:scale-110 group-hover/image:brightness-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 
                        group-hover/image:opacity-100" />
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 mb-4 flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-auto">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            <Github size={20} />
          </a>
        )}
        {github2 && (
          <a
            href={github2}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            <Github size={20} />
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
  );
}