import React from "react";
import classNames from "classnames";
import classes from "./Companies.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./carousel-with-custom-dots.css";

const companies = [
  {
    id: "1",
    name: "nike",
    image:
      "https://images.footlocker.com/content/dam/final/champs/site/evergreen/brands/6up-nike.jpg",
    link: "https://jobs.nike.com/life-at-nike?utm_source=google.com&utm_medium=paid_search&utm_campaign=Nike&utm_content=search_engine&utm_term=337018494&ss=paid&dclid=CLalh-bkjfsCFfTDwgQdk2UOMg",
  },
  {
    id: "2",
    name: "mcdonalds",
    image:
      "https://www.freepnglogos.com/uploads/mcdonalds-png-logo/mcdonalds-png-logo-simple-m-1.png",
    link: "https://signup.mchire.com/",
  },
  {
    id: "3",
    name: "starbucks",
    image:
      "https://mcdonough.com/wp-content/uploads/2020/09/starbucks-logo-png-transparent.png",
    link: "https://www.starbucks.com/careers/",
  },
  {
    id: "4",
    name: "wendys",
    image: "https://assets.simon.com/tenantlogos/6568.png",
    link: "https://wendys-careers.com/",
  },
  {
    id: "5",
    name: "pandaexpress",
    image:
      "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/012016/untitled-1_333.png?itok=WvWJyeD9",
    link: "https://pandarg.referrals.selectminds.com/",
  },
  {
    id: "6",
    name: "coffeebean",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Coffee_Bean_%26_Tea_Leaf_logo.svg/1200px-Coffee_Bean_%26_Tea_Leaf_logo.svg.png",
    link: "https://www.coffeebean.com/careers",
  },
  {
    id: "7",
    name: "zara",
    image:
      "https://brandlogos.net/wp-content/uploads/2022/04/zara-logo-brandlogos.net_.png",
    link: "https://www.zara.com/us/en/z-job-corp1398.html",
  },
];

const links = [
  "https://jobs.nike.com/life-at-nike?utm_source=google.com&utm_medium=paid_search&utm_campaign=Nike&utm_content=search_engine&utm_term=337018494&ss=paid&dclid=CLalh-bkjfsCFfTDwgQdk2UOMg",
  "https://signup.mchire.com/",
  "https://www.starbucks.com/careers/",
  "https://wendys-careers.com/",
  "https://pandarg.referrals.selectminds.com/",
  "https://www.coffeebean.com/careers",
  "https://www.zara.com/us/en/z-job-corp1398.html",
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1200, min: 1000 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 1000, min: 0 },
    items: 3,
  },
  phone: {
    breakpoint: { max: 420, min: 0 },
    items: 3,
  },
};

const CustomDot = ({ index, onClick, active }) => {
  return (
    <div className={classes.containerCustomDots}>
      <button
        onClick={(e) => {
          onClick();
          e.preventDefault();
          console.log(e);
        }}
        className={classNames("custom-dot", {
          "custom-dot--active": active,
        })}
      />
    </div>
  );
};

const Companies = () => {
  return (
    <div className={classes.wrapper}>
      <Carousel
        responsive={responsive}
        autoPlay
        infinite
        autoPlaySpeed={2000}
        className={classes.container}
        arrows={false}
        showDots
        customDot={<CustomDot />}
      >
        {companies.map((company, i) => (
          <div key={i}>
            <a href={company.link}>
              <img src={company.image} className={classes.cardImg} />
            </a>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Companies;
