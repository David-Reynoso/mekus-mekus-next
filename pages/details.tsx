import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { recipeType } from "../pages/index";
import Image from "next/image";
import homePage from "../public/homePage.png";
import main from "../styles/main.module.css";
import Footer from "./components/Footer";

const details = () => {
  const router = useRouter();
  const { id } = router.query;

  const [recipeDetail, setDetails] = useState<recipeType>();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(`http://localhost:5000/recipes/${id}`);
      const data = await response.json();
      setDetails(data);
    };

    fetchRecipes();
  }, [router]);

  return (
    <div className={main.detailsContainer}>
      <Head>
        <title>Mekus Mekus | Recipe</title>
      </Head>
      <Link style={{ textDecoration: "none", color: "none" }} href="../">
        <div className={main.homeButton}>
          <Image
            className={main.buttonIcon}
            src={homePage}
            alt="Home Button Icon"
          ></Image>
        </div>
      </Link>
      <div className={main.detailsUpper}>
        <div className={main.detailsImageholder}>
          {recipeDetail?.image ? (
            <Image
              className={main.detailsImage}
              width={1000}
              height={1000}
              priority={true}
              src={recipeDetail?.image}
              alt="Home Button Icon"
            ></Image>
          ) : (
            <h1>Loading image....</h1>
          )}
        </div>
        <div className={main.detailsRecipedescription}>
          <h1 className={main.detailsRecipetitle}>{recipeDetail?.name}</h1>
          <h2 className={main.detailsRecipecategory}>
            {recipeDetail?.category}
          </h2>
          <p className={main.detailsRecipeingredients}>
            {recipeDetail?.ingredients}
          </p>
        </div>
      </div>
      <div className={main.detailsInstruction}>
        <h2 className={main.detailsRecipeinstructiontitle}>Instruction</h2>
        <p className={main.detailsRecipeinstruction}>
          {recipeDetail?.instruction}
        </p>
      </div>
      <Footer />
    </div>
  );
};
export default details;
