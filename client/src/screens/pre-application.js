import { useForm } from "react-hook-form";
import { Button, Input, RadioInput, Select, SelectOption, TextLink } from "@solera/ui";

function PreApplicationScreen() {
  const { register, handleSubmit, getValues } = useForm();
  return (
    <div>
      <h1>
        Welcome to Solera National Bank's lending platform for retirement
        accounts!
      </h1>
      <form
        name="pre-application"
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
        <div>
          <RadioInput
            id="ff-yes"
            name="fix_and_flip"
            label="Yes"
            value="yes"
            {...register("fix_and_flip")}
          />
          <RadioInput
            id="ff-no"
            name="fix_and_flip"
            label="No"
            value="no"
            {...register("fix_and_flip")}
          />
        </div>
        <Select
          label="What entity type will the property be titled under?"
          id="entity-type"
          name="entity_type"
          css={{ marginBottom: "3rem" }}
          {...register("entity_type")}
        >
          <SelectOption value="llc">LLC</SelectOption>
          <SelectOption value="trust">Trust</SelectOption>
        </Select>
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
