# Components

## Notes

Image_Increment_RefCount
Image_Decrement_RefCount
[ g.Module_Library_DB ].

With image_id as the param

## Features

- Components
  - Add a **Code**, **Name**, Description, Image, and **Allow Nested Components**
  - Add specific attributes/ options for each component.
    - **Code**, **Prompt**, **Type**, **Required**
    - Types: Text Field, Radio Buttons, Drop-down List, Checkbox, Text Area, Image, Product, Category, Link
    - Editable Display Order
- Layouts
  - Add a **Code**, **Name**
  - Selecting a layout will give you the option to Duplicate it (you will enter a new code/name).
  - Add Components, Remove Components, Update Components
  - Drag & Drop UI to quickly re-arrange components
  - Image Preview for components (if there is an image set)
  - Image Preview for component options (image type only)
  - Product/ Category/ Page Batchlist Popups (when allowed for attribute types: product, category, link)
  - Update button to save all changes (does not save on the fly)
  

## Random Screenshots

![Admin UI](http://puu.sh/zF3Qy/1e2004893f.png)
![Edit Popup](http://puu.sh/zF40y/1b91c46bff.png)
![Add New Popup - With All Fields](http://puu.sh/zF8au/153f4aecfd.png)
![Duplicate Layouts Feature](https://puu.sh/zF7Js/8786d08fdb.png)
![Drag & Drop](https://puu.sh/zF7Zz/e32d8bbd12.png)
---

## Items

```xml
<mvt:item name="tgcomponent" param="Layout_Load_Code( 'homepage_slider', l.settings:output )"/>
```

## Example

```
[1]:active=1
[1]:attributes:title:value=Featured+Slider+1
[1]:children[1]:active=1
[1]:children[1]:attributes:alt_text:value=Slide+1+%3A%29
[1]:children[1]:attributes:image:value=graphics%2F00000001%2F21356803_085_m1.jpg
[1]:children[1]:attributes:link:link:type=G
[1]:children[1]:attributes:link:link:value=ABUS
[1]:children[1]:attributes:link:value=http%3A%2F%2Ftguefen.mivamerchantdev.com%2Fabout-us.html
[1]:children[1]:component:allow_children=0
[1]:children[1]:component:code=slide
[1]:children[1]:component:id=2
[1]:children[1]:component:name=Slide
[1]:children[1]:component_id=2
[1]:children[1]:disp_order=1
[1]:children[1]:id=2
[1]:children[1]:layout_id=1
[1]:children[1]:name=Slide+1
[1]:children[1]:parent=6
[1]:children[2]:active=1
[1]:children[2]:attributes:alt_text:value=Slide+2+%3A%29
[1]:children[2]:attributes:image:value=graphics%2F00000001%2F33336215_069_b.jpg
[1]:children[2]:attributes:link:link:type=C
[1]:children[2]:attributes:link:link:value=nes
[1]:children[2]:attributes:link:value=http%3A%2F%2Ftguefen.mivamerchantdev.com%2Fntsdfhsdfklhjs.html
[1]:children[2]:component:allow_children=0
[1]:children[2]:component:code=slide
[1]:children[2]:component:id=2
[1]:children[2]:component:name=Slide
[1]:children[2]:component_id=2
[1]:children[2]:disp_order=2
[1]:children[2]:id=3
[1]:children[2]:layout_id=1
[1]:children[2]:name=Slide+2
[1]:children[2]:parent=6
[1]:children[3]:active=1
[1]:children[3]:attributes:alt_text:value=Slide+3+%3A%29
[1]:children[3]:attributes:image:value=graphics%2F00000001%2F33336215_079_b.jpg
[1]:children[3]:attributes:link:link:type=P
[1]:children[3]:attributes:link:link:value=Default_Variant
[1]:children[3]:attributes:link:value=http%3A%2F%2Ftguefen.mivamerchantdev.com%2FDefault-Variant-Example
[1]:children[3]:component:allow_children=0
[1]:children[3]:component:code=slide
[1]:children[3]:component:id=2
[1]:children[3]:component:name=Slide
[1]:children[3]:component_id=2
[1]:children[3]:disp_order=3
[1]:children[3]:id=4
[1]:children[3]:layout_id=1
[1]:children[3]:name=Slide+3
[1]:children[3]:parent=6
[1]:children_count=3
[1]:component:allow_children=1
[1]:component:code=slider_wrap
[1]:component:id=1
[1]:component:name=Slider+Wrap
[1]:component_id=1
[1]:disp_order=1
[1]:id=6
[1]:layout_id=1
[1]:name=Featured+Slider+1
[1]:parent=0
[2]:active=1
[2]:attributes:title:value=Featured+Slider+2
[2]:children[1]:active=1
[2]:children[1]:attributes:alt_text:value=test
[2]:children[1]:attributes:image:value=graphics%2F00000001%2F32842809_004_a.jpg
[2]:children[1]:component:allow_children=0
[2]:children[1]:component:code=slide
[2]:children[1]:component:id=2
[2]:children[1]:component:name=Slide
[2]:children[1]:component_id=2
[2]:children[1]:disp_order=1
[2]:children[1]:id=7
[2]:children[1]:layout_id=1
[2]:children[1]:name=Slide+4
[2]:children[1]:parent=1
[2]:children[2]:active=1
[2]:children[2]:attributes:alt_text:value=slide+8
[2]:children[2]:attributes:image:value=graphics%2F00000001%2F33336215_095_b.jpg
[2]:children[2]:component:allow_children=0
[2]:children[2]:component:code=slide
[2]:children[2]:component:id=2
[2]:children[2]:component:name=Slide
[2]:children[2]:component_id=2
[2]:children[2]:disp_order=2
[2]:children[2]:id=9
[2]:children[2]:layout_id=1
[2]:children[2]:name=Slide+5
[2]:children[2]:parent=1
[2]:children[3]:active=1
[2]:children[3]:attributes:alt_text:value=Slide+6
[2]:children[3]:attributes:image:value=graphics%2F00000001%2Flogo.png
[2]:children[3]:attributes:link:link:type=P
[2]:children[3]:attributes:link:link:value=My_Product
[2]:children[3]:attributes:link:value=http%3A%2F%2Ftguefen.mivamerchantdev.com%2FMy-Product-Brandon-Hello-Whatsup
[2]:children[3]:component:allow_children=0
[2]:children[3]:component:code=slide
[2]:children[3]:component:id=2
[2]:children[3]:component:name=Slide
[2]:children[3]:component_id=2
[2]:children[3]:disp_order=3
[2]:children[3]:id=8
[2]:children[3]:layout_id=1
[2]:children[3]:name=Slide+6
[2]:children[3]:parent=1
[2]:children_count=3
[2]:component:allow_children=1
[2]:component:code=slider_wrap
[2]:component:id=1
[2]:component:name=Slider+Wrap
[2]:component_id=1
[2]:disp_order=2
[2]:id=1
[2]:layout_id=1
[2]:name=Featured+Slider+2
[2]:parent=0
```

---

## Attribute Types

- Dropdown
- Radio
- Checkbox
- Textfield
- Textarea
- Image Upload
- Category (supply ID)
- Product (supply ID)
- Link (Includes Product, Category, Page, URL & None )
