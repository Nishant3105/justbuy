import ImageCard from '../../components/ImageCard'
const Offers = () => {
  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ImageCard
        title="Electronics"
        image="/images/electronics.jpg"
        description="These are electronics items."
        buttonText="Shop Now"
      />
      <ImageCard
        title="Fashion"
        image="/images/fashion.jpg"
        description="These are fashion items."
        buttonText="Explore"
      />
      <ImageCard
        title="Home Decor"
        image="/images/decor.jpg"
        description="These are home decor items."
        buttonText="View"
      />
    </section>
  )
}

export default Offers