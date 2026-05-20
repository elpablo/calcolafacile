import CompoundInterest from "./CompoundInterest";

export const metadata = {
    title: "Calcolatore interesse composto - Simula la crescita di un investimento",
    description:
        "Calcola l’interesse composto, simula versamenti mensili e visualizza la crescita di un investimento nel tempo con grafico e tabella annuale.",
    alternates: {
        canonical: "https://calcolafacile.org/it/interesse-composto",
        languages: {
            it: "https://calcolafacile.org/it/interesse-composto",
            en: "https://calcolafacile.org/en/compound-interest",
        },
    },
};

export default function Page() {
    return <CompoundInterest />;
}