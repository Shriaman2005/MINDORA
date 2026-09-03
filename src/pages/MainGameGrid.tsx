import { Users, FileText, Palette, LayoutGrid, Music, ListCheck, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

export function MainGameGrid() {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: "Who is this?",
      description: "Identify family members & memory photos",
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#993C1D]" />,
      bg: "bg-[#FAECE7] border-[#993C1D]/20 hover:bg-[#993C1D]/10",
      textColor: "text-[#993C1D]",
      path: "/who-is-this",
    },
    {
      id: 2,
      title: "Story Quiz",
      description: "Answer fun questions from stories",
      icon: <FileText className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#185FA5]" />,
      bg: "bg-[#E6F1FB] border-[#185FA5]/20 hover:bg-[#185FA5]/10",
      textColor: "text-[#185FA5]",
      path: "/story-quiz",
    },
    {
      id: 3,
      title: "Color Sequence",
      description: "Remember and repeat color patterns",
      icon: <Palette className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#534AB7]" />,
      bg: "bg-[#EEEDFE] border-[#534AB7]/20 hover:bg-[#534AB7]/10",
      textColor: "text-[#534AB7]",
      path: "/color-sequence",
    },
    {
      id: 4,
      title: "Pattern Recognition",
      description: "Match visual patterns & shapes",
      icon: <LayoutGrid className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#854F0B]" />,
      bg: "bg-[#FAEEDA] border-[#854F0B]/20 hover:bg-[#854F0B]/10",
      textColor: "text-[#854F0B]",
      path: "/pattern-recognition",
    },
    {
      id: 5,
      title: "Word-Sound Memory",
      description: "Listen to melodies and recall words",
      icon: <Music className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#3B6D11]" />,
      bg: "bg-[#EAF3DE] border-[#3B6D11]/20 hover:bg-[#3B6D11]/10",
      textColor: "text-[#3B6D11]",
      path: "/word-sound-memory",
    },
    {
      id: 6,
      title: "Daily Routine",
      description: "Plan and organize daily schedule",
      icon: <ListCheck className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#0F6E56]" />,
      bg: "bg-[#E1F5EE] border-[#0F6E56]/20 hover:bg-[#0F6E56]/10",
      textColor: "text-[#0F6E56]",
      path: "/reminders",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
      {/* Greeting Header Section */}
      <div className="pt-2 text-center w-full">
        <h1 className="text-[26px] md:text-[28px] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
          Welcome Savitri
        </h1>
      </div>

      {/* 1-Column List Layout */}
      <div className="flex flex-col gap-3 pt-1">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => game.path && navigate(game.path)}
            className="w-full flex items-center p-3 sm:p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-[var(--card-bg)] transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 text-left min-h-[72px] cursor-pointer group"
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 ${game.bg}`}>
              {game.icon}
            </div>
            <h2 className={`text-[19px] sm:text-[20px] font-semibold truncate px-4 flex-1 ${game.textColor} dark:text-[var(--foreground)]`}>
              {game.title}
            </h2>
            <ChevronRight className="text-slate-400 shrink-0 ml-1" size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default MainGameGrid;
