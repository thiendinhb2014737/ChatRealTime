const Button = (children: string) => {
  return (
    <div>
      <button className="text-lg text-white bg-pink-500 rounded-3xl p-4">
        {children}
      </button>
    </div>
  );
};

export default Button;
