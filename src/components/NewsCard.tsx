import React from 'react';
import Image from 'next/image';

interface NewsCardProps {
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  tagColor: string;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ imageUrl, title, description, date, tag, tagColor, className }) => {
  return (
    <div className={`bg-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col ${className || ''}`} style={{ minHeight: 320 }}>
      <div className="h-36 w-full bg-slate-700 flex items-center justify-center overflow-hidden">
        <Image src={imageUrl} alt={title} width={400} height={144} className="object-cover w-full h-full" />
      </div>
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-center mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white mr-2 ${tagColor}`}>{tag}</span>
          <span className="text-xs text-gray-400 ml-auto">{date}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-300 text-sm flex-1">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
