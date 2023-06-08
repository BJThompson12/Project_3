const Home = () => {
  return (
    <section className="flex flex-wrap items-center justify-center w-full h-full">
        <img
          alt="..."
          className="w-auto mx-auto md:mx-0 rounded-lg shadow-lg md:max-h-[75vh]"
          src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        />
        <div className="w-full mt-8 text-left md:w-6/12 md:pl-10">
          <h3 className="text-3xl font-semibold text-indigo-500">
            projeCritter
          </h3>
          <p className="mt-4 text-xl leading-relaxed text-blueGray-500">
          Tired of feeling overwhelmed with your tasks? Let our project task tracker tool be your personal assistant and help you conquer your to-do list!
          </p>
        </div>
    </section>
  );
};

export default Home;