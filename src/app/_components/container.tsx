type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-5 md:px-8 lg:px-12">{children}</div>;
};

export default Container;
