interface TitleProps {
  content: string;
}

const Title = ({ content }: TitleProps) => {
  return (
    <div className="flex items-center justify-center text-[2.8rem]">
      <p className="font-semibold">{content}</p>
    </div>
  );
};

export { Title };
