import { NgRFModelSetterService } from './model-setter.service';

describe('NgRFModelSetterService', () => {
  let nestedProps: NgRFModelSetterService;
  const model = {
    address: {
      street: 'Lombard Street',
    },
    tags: [
      'html',
      'js',
      'css',
    ],
  };

  beforeEach(() => {
    nestedProps = new NgRFModelSetterService();
  });

  it('get deep nested property value', () => {
    const street = nestedProps.getValue('address.street', model);
    const streetNumber = nestedProps.getValue('address.number', model);

    expect(street).toEqual(model.address.street);
    expect(streetNumber).toEqual(null);
  });

  it('set existent deep nested property', () => {
    const desiredNumber = 10;
    nestedProps.setValue('address.number', desiredNumber, model);

    const streetNumber = nestedProps.getValue('address.number', model);
    expect(streetNumber).toEqual(desiredNumber);
  });

  it('create and set a non existent deep nested property', () => {
    const phone = '+1 2222-3333';
    const name = 'Jane Doe';
    const email = 'jane.doe@company.com';
    const keys = {
      phone: 'contacts.phones[]',
      name: 'contacts.parents[0].name',
      email: 'contacts.parents[0].email',
    };

    nestedProps.setValue(keys.phone, phone, model);
    nestedProps.setValue(keys.name, name, model);
    nestedProps.setValue(keys.email, email, model);

    const firstPhone = nestedProps.getValue(keys.phone, model);
    const parentName = nestedProps.getValue(keys.name, model);
    const parentEmail = nestedProps.getValue(keys.email, model);

    expect(firstPhone).toEqual(phone);
    expect(parentName).toEqual(name);
    expect(parentEmail).toEqual(email);
  });

  it('get a non existent property should return null and not break', () => {
    const key = 'roles.admin[2]';
    let nill = nestedProps.getValue(key, model);
    expect(nill).toBeNull();

    nestedProps.setValue(key, 'root', model);
    nill = nestedProps.getValue(key, model);

    expect(nill).not.toBeNull();
    expect(nill).toEqual('root');
  });
});
