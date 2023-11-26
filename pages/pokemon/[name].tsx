import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { PokemonDetailProps } from "../types";
import styles from "./[name].module.css";
import React from "react";

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleBack}>
        Back
      </button>
      <h1 className={styles.name}>{pokemon.name}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const name = params?.name as string;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  const pokemon = { name: data.name };
  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonDetail;
