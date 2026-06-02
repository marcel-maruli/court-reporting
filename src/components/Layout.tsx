function Layout(props: React.PropsWithChildren) {
  return <div className="w-screen h-screen bg-white">{props.children}</div>;
}

export default Layout;
