import PropTypes from "prop-types";
import logo_app from "../media/logo app.png";

export default function Landing() {
  return (
    <div className="relative bg-white mb-20">
      <div className="container mx-auto px-4 py-12">
        <main className="mt-10">
          <div className="sm:text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
              <span className="block xl:inline text-green-cujae">AlInfo </span>
            </h2>
            <div className="flex flex-col lg:flex-row items-center mt-8">
              <div className="flex-1 mb-8 lg:mb-0 text-center lg:text-left">
                <StyledParagraph>
                  Repositorio Virtual de Ingeniería Alimentaria.
                </StyledParagraph>
                <StyledParagraph>
                  Grupo de Ingeniería Alimentaria, GIA.
                </StyledParagraph>
                <StyledParagraph>
                  Facultad de Ingeniería Química, Cujae.
                </StyledParagraph>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src={logo_app}
                  alt="logo_app"
                  className="h-64 w-64 rounded-lg object-cover object-center shadow-lg border-4 border-green-cujae"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StyledParagraph({ children }) {
  return (
    <p className="mt-3 text-lg text-gray-700 font-semibold sm:mx-auto sm:mt-5 sm:max-w-xl md:mt-5 md:text-xl lg:mx-0">
      {children}
    </p>
  );
}

StyledParagraph.propTypes = {
  children: PropTypes.string.isRequired,
};
