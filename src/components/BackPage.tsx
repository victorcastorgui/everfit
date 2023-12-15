function BackPage({ props }: { props: () => void }) {
  return (
    <button onClick={props} className="mt-[2rem] hover:font-extrabold">
      {"< Back"}
    </button>
  );
}

export default BackPage;
