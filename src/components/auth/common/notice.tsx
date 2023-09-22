import Link from 'next/link';

interface NoticeProps {
  content: string;
  actionLink: string;
  actionMessage: string;
}

const Notice = ({ content, actionLink, actionMessage }: NoticeProps) => {
  return (
    <div className="flex items-center justify-center my-[1.8rem]">
      <span className="text-gray-800">{content}</span>
      <Link legacyBehavior href={actionLink}>
        <a className="font-medium text-accent-color">&nbsp;{actionMessage}</a>
      </Link>
    </div>
  );
};

export { Notice };
