import React, { Component } from "react";
import Cart from "../../Components/Cart/Cart";
import Card from "../ProductList/Components/CardList/Card";
import "./ProductDetails.scss";
import "../ProductList/Components/CardList/CardList.scss";

const APIProductDetails = "http://www.mgm-dev.com:9000/products";
const APIGroundTypes = "http://www.mgm-dev.com:9000/products/grounds";
const APIAddToCart = "http://www.mgm-dev.com:9000/cart";
const APISimilarCoffees = "http://www.mgm-dev.com:9000/products/similar";

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productSummary: {},
      coffee: {},
      roaster: {},
      groundTypes: {},
      quantityCount: 1,
      showLearnMore: false,
      groundTypeSelected: { id: 8 },
      showCart: false,
      isGround: false,
      hideDropdown: false,
      similarCoffees: [],
    };
  }

  componentDidMount() {
    console.log(this.props, "4++4+4+4+4+4+4+4+4+4+4+");
    fetch(APIProductDetails + `/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((res) => {
        // console.log("product details: 000000000000", res);
        this.setState({
          productSummary: res.foundProduct,
          coffee: res.foundProduct.coffees,
          roaster: res.foundProduct.coffees.roasters,
        });
      });
    fetch(APIGroundTypes)
      .then((res) => res.json())
      .then((res) => {
        console.log("dropdown groundlist: ", res.foundGroundList);
        this.setState({
          groundTypes: res.foundGroundList,
        });
      });
    fetch(APISimilarCoffees + `/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("SIMILAR COFFEES...................: ", res.similarCoffees);
        this.setState({
          similarCoffees: res.similarCoffees,
        });
      });
  }

  handleIncrementQuantity = () => {
    var currentQuantity = parseInt(
      document.getElementById("currentQuantity").value,
      10
    );
    currentQuantity = isNaN(currentQuantity) ? 0 : currentQuantity;
    if (currentQuantity < 10) {
      currentQuantity++;
      document.getElementById("currentQuantity").value = currentQuantity;
      this.setState({
        quantityCount: currentQuantity,
      });
    }
  };

  handleDecreaseQuantity = () => {
    var currentQuantity = parseInt(
      document.getElementById("currentQuantity").value,
      10
    );
    currentQuantity = isNaN(currentQuantity) ? 0 : currentQuantity;
    if (currentQuantity > 1) {
      currentQuantity--;
      document.getElementById("currentQuantity").value = currentQuantity;
      this.setState({
        quantityCount: currentQuantity,
      });
    }
  };

  handleSelectWhole = () => {
    this.setState({
      isGround: false,
    });
  };

  handleSelectGround = () => {
    this.setState({
      isGround: true,
      hideDropdown: false,
    });
  };

  handleLearnMore = () => {
    const { showLearnMore } = this.state;
    this.setState({
      showLearnMore: !showLearnMore,
    });
  };

  handleGroundType = (obj) => {
    const { hideDropdown } = this.state;
    this.setState({
      groundTypeSelected: obj,
      hideDropdown: !hideDropdown,
    });
  };

  handleShowCart = () => {
    const { showCart } = this.state;
    this.setState({
      showCart: !showCart,
    });
  };

  handleHideCart = () => {
    this.setState({
      showCart: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isGround !== this.state.isGround && !this.state.isGround) {
      this.setState({ groundTypeSelected: { id: 8 } }, () =>
        console.log(this.state.groundTypeSelected)
      );
    }
  }

  handleAddtoCart = () => {
    const { productSummary, groundTypeSelected, quantityCount } = this.state;

    console.log("=====================");
    console.log(productSummary.id, groundTypeSelected.id, quantityCount);

    fetch(APIAddToCart, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId: productSummary.id,
        groundId: groundTypeSelected.id,
        quantity: quantityCount,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("================================");
        console.log("백앤드에서 오는 응답 메세지: ", response);

        if (response.message === "success") {
          this.handleShowCart();
        } else {
          alert("로그인을 먼저 해주세요!");
        }
      });
  };

  render() {
    console.log("thirdly: ", this.state.productSummary);
    console.log("coffee", this.state.coffee, "roaster", this.state.roaster);

    const {
      productSummary,
      coffee,
      roaster,
      showLearnMore,
      quantityCount,
      groundTypes,
      groundTypeSelected,
      hideDropdown,
      showCart,
      isGround,
      similarCoffees,
    } = this.state;

    return (
      <div className="productDetails">
        {showCart === true ? (
          <Cart
            showCart={showCart}
            handleHideCart={this.handleHideCart}
            handleShowCart={this.handleShowCart}
          />
        ) : null}
        <section className="productDetailsMain">
          <div className="productImage">
            <img src={productSummary.image_url} alt="제품이미지" />
          </div>
          <div className="descriptionWrapper">
            <p className="titleRoastery">{roaster && roaster.name}</p>
            <p className="titleProductName">{productSummary.name}</p>
            <p className="productDescription">{coffee && coffee.note}</p>
            <p className="price">
              ${productSummary.price}
              <span>
                {""}|{""}
              </span>
              {coffee && coffee.bag_weight}
            </p>
            <div className="quantityPicker">
              <div className="quantityLabel">
                <span>Quantity</span>
              </div>
              <div className="quantityWrapper">
                <input
                  type="button"
                  className="quantitySubtract"
                  value="-"
                  onClick={this.handleDecreaseQuantity}
                />
                <input
                  type="text"
                  className="quantitySelected"
                  id="currentQuantity"
                  value={quantityCount}
                />
                <input
                  type="button"
                  value="+"
                  className="quantityAdd"
                  onClick={this.handleIncrementQuantity}
                />
              </div>
            </div>
            <div className="grindPicker">
              <div className="grindLabel">
                <span>Grind</span>
              </div>
              <div className="grindContainer">
                <button
                  onClick={this.handleSelectWhole}
                  className={
                    isGround ? "grindWhole" : "grindWhole selectedContainer"
                  }
                >
                  Whole
                </button>
                <button
                  onClick={this.handleSelectGround}
                  // value={}
                  className={
                    isGround ? "grindGround selectedContainer" : "grindGround"
                  }
                >
                  Ground
                  {groundTypeSelected ? (
                    <p className="selectedOptionValue">
                      {groundTypeSelected.name}
                    </p>
                  ) : null}
                </button>
              </div>
              {isGround && !hideDropdown ? (
                <div className="groundTypeDropdown">
                  <ul className="dropdownOptions">
                    {groundTypes &&
                      groundTypes.map((option) => (
                        <li className="optionItem">
                          <input
                            onClick={() => this.handleGroundType(option)}
                            name="groundTypeSelected"
                            type="button"
                            value={option.name}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <button className="addBagBtn" onClick={this.handleAddtoCart}>
              <span>ADD TO BAG </span>
              <span>
                {""}|{""}
              </span>
              <span className="itemPrice">
                {`PAY $${(+quantityCount * +productSummary.price).toFixed(2)}`}
              </span>
            </button>
          </div>
        </section>
        <section className="productSpecs">
          <div className="scheduleWrapper">
            <div>
              <div className="specsImageWrapper">
                <img src="/Images/roasting-icon.svg" alt="icon" />
              </div>
              <p className="infoTitle">Roasting Schedule</p>
              <p className="infoSummary">
                Roasts on {coffee && coffee.roasting_schedule}
              </p>
            </div>
          </div>
          <div className="roastLevelWrapper">
            <div>
              <div className="specsImageWrapper">
                <img src="/Images/roastlevel-icon.svg" alt="icon" />
              </div>
              <p className="infoTitle">
                Trade Roast Level
                <button onClick={this.handleLearnMore} className="learnMoreBtn">
                  <img src="/Images/learn-more-icon.svg" />
                </button>
              </p>
              <p className="infoSummary">{coffee && coffee.roast_level}</p>
              {showLearnMore && showLearnMore ? (
                <div className="roastLevelLearnMore">
                  <div className="learnMoreTitle">Trade Roast Level</div>
                  <div className="learnMoreBody">
                    Each roaster interprets roast level differently. We evaluate
                    every coffee by our own common standard that is consistent
                    across our catalog for easy browsing.
                  </div>
                </div>
              ) : null}
              <p className="infoSummary">
                {coffee && coffee.trade_roast_level}
              </p>
            </div>
          </div>
          <div className="tasteWrapper">
            <div>
              <div className="specsImageWrapper">
                <img src="/Images/taste-icon.svg" alt="icon" />
              </div>
              <p className="infoTitle">Taste</p>
              <p className="infoSummary">{coffee && coffee.taste}</p>
            </div>
          </div>
        </section>
        <section className="aboutTheRoaster">
          <aside className="aboutRoasterImage">
            <img src={roaster && roaster.image_url} alt="aboutroaster-image" />
          </aside>
          <div className="aboutRoasterText">
            <div className="aboutTextWrapper">
              <h2 className="aboutRoasterHeading">About the Roaster</h2>
              <div className="locationInfo">
                <div className="iconWrapper">
                  <img src="/Images/location-icon.svg" alt="location-icon" />
                </div>
                <div className="aboutInfoText">
                  <p className="factLabel">Location</p>
                  <p className="factSummary">{roaster && roaster.location}</p>
                </div>
              </div>
              <div className="funfactInfo">
                <div className="iconWrapper">
                  <img src="/Images/funfact-icon.svg" alt="funfact-icon" />
                </div>
                <div className="aboutInfoText">
                  <p className="factLabel">Fun Fact</p>
                  <p className="factSummary">{roaster && roaster.fun_fact}</p>
                </div>
              </div>
              <div className="shopRoasterBtn">
                <button>
                  Shop {roaster && roaster.name}
                  {""} <span>⟶</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="moreDetails">
          <h1 className="detailsHeading">Details</h1>
          <div className="coffeeFactsContainer">
            <h1 className="coffeeNameHeading">{productSummary.name}</h1>
            <div className="coffeeFactsBody">
              <div className="coffeeProcess">
                <div>
                  <img src="/Images/process-icon.svg" alt="icon" />
                </div>
                <div className="coffeeFactsText">
                  <div className="factsCategory">Process</div>
                  <div>{coffee && coffee.process}</div>
                </div>
              </div>
              <div className="coffeeSubRegion">
                <div>
                  <img src="/Images/subregion-icon.svg" alt="icon" />
                </div>
                <div className="coffeeFactsText">
                  <div className="factsCategory">Sub Region</div>
                  <div>{coffee && coffee.sub_region}</div>
                </div>
              </div>

              <div className="coffeeElevation">
                <div>
                  <img src="/Images/elevation-icon.svg" alt="icon" />
                </div>
                <div className="coffeeFactsText">
                  <div className="factsCategory">Elevation</div>
                  <div>{coffee && coffee.elevation}</div>
                </div>
              </div>
              <div className="coffeeVariety">
                <div>
                  <img src="/Images/variety-icon.svg" alt="icon" />
                </div>
                <div className="coffeeFactsText">
                  <div className="factsCategory">Variety</div>
                  <div>{coffee && coffee.variety}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="roastersNotesContainer">
            <h2 className="roastersNotesHeading">Roaster's Notes</h2>
            <div className="roastersNotesBody">{coffee && coffee.note}</div>
          </div>
        </section>
        <div className="similarCoffeesContainer">
          <div className="similarCoffeesHeading">Similar Coffees</div>
          <div className="similarCoffeesBody">
            {similarCoffees &&
              similarCoffees.map((coffee) => (
                <div className="cardWrapper">
                  <Card
                    id={coffee && coffee.id}
                    img={coffee && coffee.image_url}
                    taste={coffee && coffee.coffees.taste}
                    company={coffee && coffee.company}
                    name={coffee && coffee.name}
                    price={coffee && coffee.price}
                    key={coffee && coffee.id}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
