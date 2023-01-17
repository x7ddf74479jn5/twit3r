type Props = {
  children: React.ReactNode;
  classNames?: string;
};

export const Container = ({ children, classNames = "" }: Props) => {
  return (
    <div className={`m-auto max-w-xl bg-slate-200 ${classNames}`}>
      {children}
    </div>
  );
};
