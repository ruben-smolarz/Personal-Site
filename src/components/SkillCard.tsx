
interface SkillCardProps {
  skill: string;
  index: number;
  isLoaded: boolean;
}

export default function SkillCard({ skill, index, isLoaded }: SkillCardProps) {
  return (
    <div
      className={`relative bg-gray-900 p-6 rounded-lg text-center cursor-default
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
        transition-opacity duration-500
        before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r 
        before:from-purple-500/20 before:to-blue-500/20 before:opacity-0 
        before:transition-opacity before:duration-300 hover:before:opacity-100
        after:absolute after:inset-0 after:rounded-lg after:shadow-[0_0_15px_2px_rgba(168,85,247,0.4)]
        after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100`}
      style={{ 
        transitionDelay: `${index * 100}ms`
      }}
    >
      <div className="relative z-10">
        <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {skill}
        </span>
      </div>
    </div>
  );
}