export const Teste = () => {
  return (
    <>
      <div className="Desktop1440 hidden w-full overflow-x-hidden md:inline-block">
        <img src="/project/bg.png" alt="background" className="absolute inset-0 h-[748px]" />
        <div className="SectionDestaque absolute left-[10px] top-[90px] inline-flex max-w-full items-end justify-start py-10 lg:left-[150px] lg:top-[155px] lg:w-5/6">
          <div className="ColTextos inline-flex w-full max-w-xl flex-col items-start justify-end gap-5">
            <h6 className="H6 self-stretch leading-tight text-white">Bem vindo à Transit</h6>
            <h3 className="H3 self-stretch leading-tight text-white">
              Transformando ações em oportunidades
            </h3>
            <p className="P self-stretch break-words leading-tight text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec vehicula
              nulla, nec dignissim tellus. Mauris finibus mi auctor mauris suscipit viverra. Cras
              venenatis nisl vel venenatis tempus.
            </p>
            <button className="Button inline-flex h-14 w-44 items-center justify-center gap-2.5 rounded-lg bg-white">
              <p className="P leading-tight text-cyan-400">Saiba mais</p>
            </button>
          </div>
          <div className="ColImagens hidden shrink grow basis-0 flex-col items-center justify-center gap-2.5 xl:inline-flex">
            <div className="PositionAbsolute relative h-[420px] w-full">
              <img
                alt="oi"
                src="project/img2.png"
                className="Rectangle1 absolute left-[212px] top-[80px] h-72 w-64 rounded-3xl"
              />
              <img
                alt="oi"
                src="project/img1.png"
                className="Rectangle2 absolute left-0 top-[30px] h-96 w-64 rounded-3xl"
              />
            </div>
          </div>
        </div>
        <div className="Header absolute top-0 inline-flex max-w-full items-center justify-center py-10 lg:left-[150px] lg:w-5/6">
          <div className="ColLogo inline-flex w-40 flex-col items-start justify-center gap-5 self-stretch p-2.5">
            <h3 className="H3 h-14 w-36 leading-tight text-white">Transit</h3>
          </div>
          <div className="ColNavbar inline-flex shrink grow basis-0 flex-col items-start justify-center gap-5 self-stretch p-2.5">
            <div className="Navbar inline-flex items-start justify-start gap-2.5 self-stretch rounded-lg bg-white py-2">
              <a className="Link flex items-center justify-center px-4 py-2">
                <p className="P leading-tight text-blue-500">Link-01</p>
              </a>
              <a className="Link flex items-center justify-center px-4 py-2">
                <p className="P leading-tight text-blue-500">Link-01</p>
              </a>
              <a className="Link flex items-center justify-center px-4 py-2">
                <p className="P leading-tight text-blue-500">Link-01</p>
              </a>
              <a className="Link flex items-center justify-center px-4 py-2">
                <p className="P leading-tight text-blue-500">Link-01</p>
              </a>
            </div>
          </div>
          <div className="ColButton inline-flex flex-col items-center justify-center gap-5 self-stretch p-2.5">
            <button className="Button inline-flex w-44 shrink grow basis-0 items-center justify-center gap-2.5 rounded-lg bg-gradient-to-l from-cyan-400 to-blue-500">
              <p className="P h-5 w-16 leading-tight text-white">Comprar</p>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="Mobile768 inline-block w-full overflow-x-hidden md:hidden">
        <img src="/project/bg-mobile.png" alt="background" className="absolute inset-0 h-[768px]" />
        <section className="SectionDestaque absolute left-0 top-[155px] inline-flex w-full items-end justify-start py-10">
          <div className="ColTextos inline-flex h-fit w-full flex-col items-start justify-end gap-5">
            <h6 className="H6 h-5 self-stretch text-center text-white">Bem vindo à Transit</h6>
            <h3 className="H3 self-stretch text-center text-white">
              Transformando ações em oportunidades
            </h3>
            <p className="P text-baseleading-tight self-stretch break-words text-center text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec vehicula
              nulla, nec dignissim tellus. Mauris finibus mi auctor mauris suscipit viverra. Cras
              venenatis nisl vel venenatis tempus.
            </p>
            <button className="Button inline-flex h-14 items-center justify-center gap-2.5 self-stretch rounded-lg bg-white">
              <p className="P text-cyan-400">Saiba mais</p>
            </button>
          </div>
        </section>
        <header className="Header absolute left-0 top-0 inline-flex w-full items-center justify-center py-10">
          <div className="ColLogo inline-flex shrink grow basis-0 flex-col items-start justify-center gap-5 self-stretch p-2.5">
            <h3 className="H3 h-14 w-full truncate break-words text-white">Transit</h3>
          </div>
          <div className="ColNavbar inline-flex w-full shrink grow basis-0 flex-col items-center justify-center gap-5 self-stretch">
            <button className="Menu flex h-fit w-10 flex-col items-start justify-center gap-1.5 rounded-lg bg-blue-500 px-2 py-2.5">
              <hr className="Top h-px w-6 border-2 border-white bg-white" />
              <hr className="Middle h-px w-6 border-2 border-white bg-white" />
              <hr className="Bottom h-px w-6 border-2 border-white bg-white" />
            </button>
          </div>
          <div className="ColButton inline-flex w-full shrink grow basis-0 flex-col items-center justify-center gap-5 self-stretch p-2.5">
            <button className="Button inline-flex w-full shrink grow basis-0 items-center justify-center gap-2.5 rounded-lg bg-gradient-to-l from-cyan-400 to-blue-500">
              <p className="P h-5 w-16 text-white">
                Comprar
                <br />
              </p>
            </button>
          </div>
        </header>
      </div>
    </>
  );
};
