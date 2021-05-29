import { useForm } from "react-hook-form";
import { Button, Input, TextLink } from "@solera/ui";

function PreApplicationScreen() {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <h1>
        Welcome to Solera National Bank's lending platform for retirement
        accounts!
      </h1>
      <form
        name="login"
        onSubmit={handleSubmit((d) => submitForm(d))}
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          width: "100%",
          "& div": {
            marginTop: "65px",
          },
        }}
      >
        <Input
          id="entityName"
          label="Name of entity"
          name="entity_name"
          placeholder="Enter plan name"
          type="text"
          {...register("entity_name")}
        />
        <Input
          id="fundingInstitutionName"
          label="Where are the funds held to be used for this investment?"
          placeholder="Enter institution name"
          name="funding_institution_name"
          type="text"
          {...register("funding_institution_name")}
        />
      </form>
    </div>
  );
}

export { PreApplicationScreen };
