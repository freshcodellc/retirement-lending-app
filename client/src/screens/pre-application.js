import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useLoanApplication } from '../hooks/useLoanApplication';
import { useUpdateLoanApplication } from '../hooks/useUpdateLoanApplication';
import {
  Button,
  Input,
  RadioInput,
  RadioGroup,
  Select,
  SelectOption,
  TextLink,
} from "@solera/ui";

function PreApplicationScreen() {
  const { uuid } = useParams();
  const { data, status } = useLoanApplication(uuid);
  const { register, handleSubmit, setValue } = useForm();
  const mutation = useUpdateLoanApplication();

  function submitForm(formData) {
    mutation.mutate({...formData, uuid});
  }

  useEffect(() => {
    register("entity_type");
  }, [register]);

  function handleSelectChange(value) {
    setValue("entity_type", value)
  }

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
          <RadioGroup text='Do you plan to "fix and flip" this property?'>
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
          </RadioGroup>
        </div>
        <Select
          label="What entity type will the property be titled under?"
          id="entity-type"
          name="entity_type"
          css={{ marginBottom: "3rem" }}
          onChange={handleSelectChange}
        >
          <SelectOption value="default">Choose one</SelectOption>
          <SelectOption value="IRA_LLC">LLC</SelectOption>
          <SelectOption value="IRA_TRUST">Trust</SelectOption>
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
        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}

export { PreApplicationScreen };
