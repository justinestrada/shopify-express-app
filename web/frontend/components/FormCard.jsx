
import { useState, useCallback } from 'react'
import {Card, FormLayout, TextField, Select, Checkbox, Text, Button} from '@shopify/polaris';
import { useAuthenticatedFetch } from "../hooks";

export function FormCard () {
  const [affiliateID, setAffiliateID] = useState('');
  const [orderID, setOrderID] = useState('');
  const [volumeType, setVolumeType] = useState('customer');
  const [checked, setChecked] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const fetch = useAuthenticatedFetch();

  const checkboxChange = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );
  const volumeTypeChange = useCallback(
    (value) => setVolumeType(value),
    [],
  );

  const options = [
    {label: 'Customer', value: 'customer'},
    {label: 'Personal', value: 'personal'},
  ];

  const is_form_valid = affiliateID && orderID && volumeType && checked;

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    // setIsLoading(true);
    const response = await fetch("/api/orders", {method: "POST"});
    // if (true) {
    if (response.ok) {
      alert('TODO: show success message');
    } else {
    //   setIsLoading(false);
      alert('TODO: show error message');
    }
  };
  return (
    <Card sectioned>
      <Text as="h2" variant="bodyMd">
        Gigfiliate Tool
      </Text>
      <Text as="h3" variant="bodyMd">
        Manually Set Order as Affiliate Order
      </Text>
      <p>Select the order that you want to set as an affiliate order. This will then post the order to the Vitalibis Partner portal system and mark the order as an affiliate order.</p>
      <FormLayout>
        <TextField type="number" label="Affiliate ID" onChange={(value) => setAffiliateID(value)} value={affiliateID} autoComplete="off" />
        <TextField type="number" label="Order ID" onChange={(value) => {
          setOrderID(value)
        }} value={orderID} autoComplete="off" />
        <Select
          label="Volume Type"
          options={options}
          onChange={volumeTypeChange}
          value={volumeType}
        />
        <p>If Volume Type is Personal then the order customer email has to equal the affilate email.</p>
        <Checkbox
          label="Are you sure?"
          checked={checked}
          onChange={checkboxChange}
        />
        {/* loading={isLoading} */}
        <Button disabled={!is_form_valid} submit onClick={handleSubmit}>Submit</Button>
      </FormLayout>
    </Card>
  );
}
