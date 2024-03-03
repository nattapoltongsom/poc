CREATE SCHEMA IF NOT exists lake_import;
CREATE schema IF NOT exists pos_dbo;
-- CREATE schema IF NOT exists public;

-- -- DROP sequence IF EXISTS public.migrations_id_seq;
-- -- CREATE sequence public.migrations_id_seq
-- -- 	INCREMENT BY 1
-- -- 	MINVALUE 1
-- -- 	MAXVALUE 9223372036854775807
-- -- 	START 1;

DROP TABLE IF EXISTS lake_import.master_product;
CREATE table lake_import.master_product (
	barcode varchar(256) NOT NULL,
	sku varchar(256) NOT NULL,
	product_name varchar(256) NOT NULL,
	brand_code varchar(256) NOT NULL,
	brand_name varchar(256) NOT NULL,
	original_price numeric(9, 2) NOT NULL,
	sale_price numeric(9, 2) NOT NULL,
	category_lv1 varchar(256) NOT NULL,
	category_lv2 varchar(256) NOT NULL,
	is_active bool NOT NULL,
	sku_type varchar(256) NOT NULL,
	group_name varchar(256) NOT NULL
);

DROP TABLE IF EXISTS pos_dbo.TCNTPdtStkBal;
CREATE TABLE pos_dbo.TCNTPdtStkBal (
	"FTBchCode" varchar(5) NOT NULL,
	"FTWahCode" varchar(5) NOT NULL,
	"FTPdtCode" varchar(20) NOT NULL,
	"FCStkQty" numeric(18, 4) NULL,
	"FDLastUpdOn" timestamp NULL,
	"FTLastUpdBy" varchar(20) NULL,
	"FDCreateOn" timestamp NULL,
	"FTCreateBy" varchar(20) NULL,
	CONSTRAINT "TCNTPdtStkBal_pkey" PRIMARY KEY ("FTBchCode", "FTWahCode", "FTPdtCode")
);

INSERT INTO lake_import.master_product (barcode, sku, product_name, brand_code, brand_name, original_price, sale_price, category_lv1, category_lv2, is_active, sku_type, group_name) VALUES('8853734853662', '100000003', 'All Court Leather OX - White/Red US 9', 'conve', 'CONVERSE', 2290.00, 1399.00, 'shoes', 'sneakers', true, 'CREDIT', 'OWMS_Credit');
INSERT INTO lake_import.master_product (barcode, sku, product_name, brand_code, brand_name, original_price, sale_price, category_lv1, category_lv2, is_active, sku_type, group_name) VALUES('8853734853594', '100000008', 'All Court Leather OX - White/Grey US 8', 'conve', 'CONVERSE', 2290.00, 1399.00, 'shoes', 'sneakers', true, 'CREDIT', 'OWMS_Credit');
INSERT INTO lake_import.master_product (barcode, sku, product_name, brand_code, brand_name, original_price, sale_price, category_lv1, category_lv2, is_active, sku_type, group_name) VALUES('8853734853587', '100000001', 'All Court Leather OX - White/Grey US 7', 'conve', 'CONVERSE', 2290.00, 1399.00, 'shoes', 'sneakers', true, 'CREDIT', 'OWMS_Credit');
INSERT INTO lake_import.master_product (barcode, sku, product_name, brand_code, brand_name, original_price, sale_price, category_lv1, category_lv2, is_active, sku_type, group_name) VALUES('8853734853655', '100000017', 'All Court Leather OX - White/Red US 8', 'conve', 'CONVERSE', 2290.00, 1399.00, 'shoes', 'sneakers', true, 'CREDIT', 'OWMS_Credit');
INSERT INTO lake_import.master_product (barcode, sku, product_name, brand_code, brand_name, original_price, sale_price, category_lv1, category_lv2, is_active, sku_type, group_name) VALUES('8853734851965', '100000010', 'Chuck 70 Trail Hi - Black/Multi US 7', 'conve', 'CONVERSE', 3190.00, 1899.00, 'shoes', 'sneakers', true, 'CREDIT', 'OWMS_Credit');
INSERT INTO lake_import.master_product (barcode, sku, product_name, brand_code, brand_name, original_price, sale_price, category_lv1, category_lv2, is_active, sku_type, group_name) VALUES('8853734853648', '100000015', 'All Court Leather OX - White/Red US 7', 'conve', 'CONVERSE', 2290.00, 1399.00, 'shoes', 'sneakers', true, 'CREDIT', 'OWMS_Credit');
INSERT INTO lake_import.master_product (barcode, sku, product_name, brand_code, brand_name, original_price, sale_price, category_lv1, category_lv2, is_active, sku_type, group_name) VALUES('8853734853617', '100000002', 'All Court Leather OX - White/Grey US 10', 'conve', 'CONVERSE', 2290.00, 1399.00, 'shoes', 'sneakers', true, 'CREDIT', 'OWMS_Credit');
INSERT INTO lake_import.master_product (barcode, sku, product_name, brand_code, brand_name, original_price, sale_price, category_lv1, category_lv2, is_active, sku_type, group_name) VALUES('8853734851972', '100000013', 'Chuck 70 Trail Hi - Black/Multi US 8', 'conve', 'CONVERSE', 3190.00, 1899.00, 'shoes', 'sneakers', true, 'CREDIT', 'OWMS_Credit');


INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000001', 1.0000, '2022-07-05 16:50:53.513', 'storemhk01          ', '2022-03-23 10:45:34.517', 'storem04');
INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000002', 0.0000, '2022-07-01 12:11:27.643', 'MQReceivePrc        ', '2022-04-09 12:48:21.450', 'storem04');
INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000003', 1.0000, '2022-07-05 17:06:32.627', 'storemhk01          ', '2022-03-23 10:45:34.517', 'storem04');
INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000004', 0.0000, '2022-07-01 12:11:27.643', 'MQReceivePrc        ', '2022-04-09 12:48:21.450', 'storem04');
INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000007', 2.0000, '2022-07-01 12:11:27.643', 'storemhk01          ', '2022-03-23 10:45:34.517', 'storem04');
INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000008', 1.0000, '2022-07-05 20:06:56.270', 'MQReceivePrc        ', '2022-03-23 10:45:34.517', 'storem04');
INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000010', 2.0000, '2022-07-01 12:11:27.643', 'storem04', '2022-04-09 12:48:21.450', 'storem04');
INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000013', 2.0000, '2022-07-01 12:11:27.643', 'storem04', '2022-04-09 12:48:21.450', 'storem04');
INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000015', 2.0000, '2022-07-01 12:11:27.643', 'storem04', '2022-04-09 12:48:21.450', 'storem04');
INSERT INTO pos_dbo.TCNTPdtStkBal ("FTBchCode", "FTWahCode", "FTPdtCode", "FCStkQty", "FDLastUpdOn", "FTLastUpdBy", "FDCreateOn", "FTCreateBy") VALUES('00001', '00001', '100000017', 2.0000, '2022-07-01 12:11:27.643', 'storemhk01', '2022-03-23 10:45:34.517', 'storem04');

INSERT INTO public.bank_partner (id, name, description, remark, url, image, start_date, end_date, status, created_date, updated_date) VALUES('26b228b1-bae3-40ea-a943-80baa2895d59'::uuid, 'kbank', 'พิเศษที่ 1 รับส่วนลดสูงสุด 10%** เมื่อใช้พอยท์เท่ากับยอดซื้อ 
พิเศษที่ 2 รับคะแนนสะสมพิเศษ รวมมูลค่า 4,500 คะแนน*** 
พิเศษที่ 3 รับคะแนนสะสมพิเศษ รวมมูลค่า 30,000 คะแนน****', '', '', 'https://kpc-apps-sales-support.s3.ap-southeast-1.amazonaws.com/production/bankpartner/1662015474439.png', '2022-07-31 17:00:00.000', '2022-10-31 16:59:59.000', 'active', '2022-09-01 06:57:54.678', '2022-09-01 06:57:54.678');
INSERT INTO public.bank_partner (id, name, description, remark, url, image, start_date, end_date, status, created_date, updated_date) VALUES('a242f861-12b0-4bb8-b15a-e99c11709c42'::uuid, 'bay', 'แลกพอยต์รับเครดิตเงินคืน 15%** ', '', '', 'https://kpc-apps-sales-support.s3.ap-southeast-1.amazonaws.com/production/bankpartner/1662015518913.png', '2022-08-14 17:00:00.000', '2022-12-31 16:59:59.000', 'active', '2022-09-01 06:58:39.093', '2022-09-01 06:58:39.093');
INSERT INTO public.bank_partner (id, name, description, remark, url, image, start_date, end_date, status, created_date, updated_date) VALUES('a320aa4e-2d7f-4b43-a3f1-f8f0883e541b'::uuid, 'gsb', '- ใช้คะแนนสะสมแลกเท่ายอดใช้จ่ายรับเครดิตเงินคืน 13%
- ใช้คะแนนสะสมแลกเท่ายอดใช้จ่ายรับเครดิตเงินคืน 15%', '', '', 'https://kpc-apps-sales-support.s3.ap-southeast-1.amazonaws.com/production/bankpartner/1662015572713.png', '2022-07-31 17:00:00.000', '2022-11-30 16:59:59.000', 'active', '2022-09-01 06:59:32.891', '2022-09-01 06:59:32.891');

INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('e0c29591-9ea7-41e4-972e-cef67bb967f5'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'BROTH', '5%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');
INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('75b8a224-db1a-4b95-b5b4-09247f6e7207'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'CANON', '5%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');
INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('347c58b2-2c1a-41f1-8c3f-e325562e8493'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'DEVIA', '5%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');
INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('05343a10-695a-4306-96e9-0e5f472e2ebd'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'EPSON', '5%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');
INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('51e24dd7-9636-4575-b430-aff7b331a49a'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'JOYRE', '5%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');
INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('648375fe-20d2-4960-92a4-60ccbb5f2227'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'MANFR', '5%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');
INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('8cea588e-2ed6-48fe-aa1f-b3c96531ed53'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'POCKE', '5%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');
INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('4bc89c2f-78a7-43d8-a00a-292173a508fd'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'TIMEK', '5%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');
INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('f47553eb-c7b5-40a1-b60a-d892b381efc0'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'BOOX', '7%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');
INSERT INTO public.campaign_brands (id, campaign_id, brand_code, limit_on_top, created_date, updated_date) VALUES('23eea7c7-c29e-44ad-9a56-14ce358088da'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'NONDA', '7%', '2022-09-08 08:37:09.943', '2022-09-08 08:37:09.943');

INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('20822239-1204-4c03-9e2a-10c9908b13dc'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100000036', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');
INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('2256cf9d-072c-4b61-a994-d501ac8c1025'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100000060', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');
INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('1e01583d-96c4-43f5-b255-ac49c347d9a0'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100000059', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');
INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('9192f47f-ae61-4f88-a9cf-970acc6175fc'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100000062', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');
INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('f9b94417-95a7-4c1f-a2b1-a81fae2f53c1'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100001974', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');
INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('c53a0445-ca8c-41ab-ab7a-85b8aa4c4791'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100001968', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');
INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('49578cf9-70ab-4ad5-8adc-cc1e9c8a3f20'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100000058', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');
INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('0e7ba53f-e7be-44d8-8411-1d6d1b375685'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100000057', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');
INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('4cf08f7c-9cf7-44d1-a775-e08157e12a42'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100000166', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');
INSERT INTO public.campaign_products (id, campaign_id, product_code, limit_on_top, created_date, updated_date) VALUES('9e0ec6ba-2072-49ad-97a2-345a86303bb2'::uuid, 'ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, '100000915', '7%', '2022-09-08 08:37:09.932', '2022-09-08 08:37:09.932');

INSERT INTO public.campaigns (id, "name", description, organization_code, start_date, end_date, status, created_date, updated_date) VALUES('e620ffd3-e970-4fd4-93bb-a3b9667b7935'::uuid, 'BEAUTY LIMIT ONTOP : INFINITE HAPPINESS BEAUTY PAYDAY', 'BEAUTY LIMIT ONTOP : INFINITE HAPPINESS BEAUTY PAYDAY
Period: 11 Aug- 5 Sep ,2022 (Update 17 Aug)

1.)  ลดสูงสุด 13% ขั้นต่ำ 1,200 >> ยกเลิกขั้นต่ำ
15%,20% > จะลดตามโปรคือ 13% 
------------------------------------------------------------------------
2.) 8 Special BRAND ลดพิเศษ 15% ไม่มีขั้นต่ำ
Skinrx Lab
Claire
Nuxe
Beigic
Naming
Foreo
Real Techniques
Ecotools

*** CHANTECAILLE Event วันที่ 11 Aug >> ปรับ limit on top เป็นลด ได้ 10% วันเดียวเท่านั้น
12 Aug - 5 Sep จะกลับมาลดได้ 5% ตามปกติ', 'beauty', '2022-08-10 17:00:00.000', '2022-09-05 16:59:59.000', 'inactive', '2022-08-17 06:43:45.662', '2022-09-08 11:30:43.310');
INSERT INTO public.campaigns (id, "name", description, organization_code, start_date, end_date, status, created_date, updated_date) VALUES('313dda55-dfcc-4547-8f0f-8c97a23cfdcf'::uuid, 'BEAUTY LIMIT ONTOP : INFINITE HAPPINESS LIFESTYLE PAYDAY', 'BEAUTY LIMIT ONTOP : INFINITE HAPPINESS LIFESTYLE PAYDAY
Period: 11 Aug- 5 Sep ,2022***

1.)  ลดสูงสุด 13% ขั้นต่ำ 1,200 >> ยกเลิกขั้นต่ำ
15%,20% > จะลดตามโปรคือ 13% 
------------------------------------------------------------------------
2.) 8 Special BRAND ลดพิเศษ 15% ไม่มีขั้นต่ำ
Skinrx Lab
Claire
Nuxe
Beigic
Naming
Foreo
Real Techniques
Ecotools

*** CHANTECAILLE Event วันที่ 11 Aug >> ปรับ limit on top เป็นลด ได้ 10% วันเดียวเท่านั้น
12 Aug - 5 Sep จะกลับมาลดได้ 5% ตามปกติ', 'beauty', '2022-08-10 17:00:00.000', '2022-09-05 16:59:59.000', 'inactive', '2022-08-10 15:04:17.672', '2022-09-08 11:30:21.902');
INSERT INTO public.campaigns (id, "name", description, organization_code, start_date, end_date, status, created_date, updated_date) VALUES('82398090-6d38-432f-bfe4-287e58d7ce26'::uuid, 'BEAUTY LIMIT ONTOP : INFINITE HAPPINESS LIFESTYLE PAYDAY', 'BEAUTY LIMIT ONTOP : INFINITE HAPPINESS LIFESTYLE PAYDAY
Period: 11 Aug- 5 Sep ,2022

1.)  ลดสูงสุด 13% ขั้นต่ำ 1,200 >> ยกเลิกขั้นต่ำ
15%,20% > จะลดตามโปรคือ 13% 
------------------------------------------------------------------------
2.) 8 Special BRAND ลดพิเศษ 15% ไม่มีขั้นต่ำ
Skinrx Lab
Claire
Nuxe
Beigic
Naming
Foreo
Real Techniques
Ecotools

*** CHANTECAILLE Event วันที่ 11 Aug >> ปรับ limit on top เป็นลด ได้ 10% วันเดียวเท่านั้น
12 Aug - 5 Sep จะกลับมาลดได้ 5% ตามปกติ', 'beauty', '2022-08-10 17:00:00.000', '2022-09-05 16:59:59.000', 'inactive', '2022-08-10 14:55:50.464', '2022-09-08 11:30:27.411');
INSERT INTO public.campaigns (id, "name", description, organization_code, start_date, end_date, status, created_date, updated_date) VALUES('ed2c7fb1-c6fa-43b8-8c45-bcf6a309c508'::uuid, 'BEAUTY LIMIT ONTOP : INFINITE HAPPINESS LIFESTYLE PAYDAY', 'BEAUTY LIMIT ONTOP : INFINITE HAPPINESS LIFESTYLE PAYDAY
Period: 11 Aug- 5 Sep ,2022 (Update)

1.)  ลดสูงสุด 13% ขั้นต่ำ 1,200 >> ยกเลิกขั้นต่ำ
15%,20% > จะลดตามโปรคือ 13% 
------------------------------------------------------------------------
2.) 8 Special BRAND ลดพิเศษ 15% ไม่มีขั้นต่ำ
Skinrx Lab
Claire
Nuxe
Beigic
Naming
Foreo
Real Techniques
Ecotools

*** CHANTECAILLE Event วันที่ 11 Aug >> ปรับ limit on top เป็นลด ได้ 10% วันเดียวเท่านั้น
12 Aug - 5 Sep จะกลับมาลดได้ 5% ตามปกติ', 'beauty', '2022-08-10 17:00:00.000', '2022-09-05 16:59:59.000', 'inactive', '2022-08-10 15:01:11.805', '2022-09-08 11:30:32.760');
INSERT INTO public.campaigns (id, "name", description, organization_code, start_date, end_date, status, created_date, updated_date) VALUES('08d097c2-a286-42f9-9875-e53a0b487073'::uuid, 'LIFESTYLE LIMIT ONTOP : 9.9 LIFESTYLE SHOPPING MATTERS (v2)', 'LIFESTYLE LIMIT ONTOP : 9.9 LIFESTYLE SHOPPING MATTERS
Period: 6-14 Sep ,2022

1.)  ลดสูงสุด 15% ไม่มีขั้นต่ำ (ตามลิมิทแบรนด์)
15%,20% > จะลดตามโปรคือ 15% 
------------------------------------------------------------------------
**พิเศษ วันที่ 9 September วันเดียว เท่านั้น! 
ซื้อครบ 15,000 บาท (สุทธิ) รับส่วนลดเพิ่ม ท้ายบิล มูลค่า 2,900 บาท
จำนวน 99 ออเดอร์แรก ต่อสาขา 
', 'lifestyle', '2022-09-05 17:00:00.000', '2022-09-14 16:59:59.000', 'active', '2022-09-08 11:29:54.326', '2022-09-08 11:29:54.326');
INSERT INTO public.campaigns (id, "name", description, organization_code, start_date, end_date, status, created_date, updated_date) VALUES('ba8b3449-88bc-4ab5-821f-624286f8d575'::uuid, 'LIFESTYLE LIMIT ONTOP : 9.9 LIFESTYLE SHOPPING MATTERS (New)', 'LIFESTYLE LIMIT ONTOP : 9.9 LIFESTYLE SHOPPING MATTERS
Period: 6-14 Sep ,2022

1.)  ลดสูงสุด 15% ไม่มีขั้นต่ำ (ตามลิมิทแบรนด์)
15%,20% > จะลดตามโปรคือ 15% 
------------------------------------------------------------------------
**พิเศษ วันที่ 9 September วันเดียว เท่านั้น! 
ซื้อครบ 15,000 บาท (สุทธิ) รับส่วนลดเพิ่ม ท้ายบิล มูลค่า 2,900 บาท
จำนวน 99 ออเดอร์แรก ต่อสาขา 
', 'lifestyle', '2022-09-05 17:00:00.000', '2022-09-16 16:59:59.000', 'inactive', '2022-09-08 08:37:09.820', '2022-09-08 11:30:05.571');
INSERT INTO public.campaigns (id, "name", description, organization_code, start_date, end_date, status, created_date, updated_date) VALUES('d3321e38-a2d7-4835-b6bf-d8741ab69bb0'::uuid, 'LIFESTYLE LIMIT ONTOP : 9.9 LIFESTYLE SHOPPING MATTERS', 'LIFESTYLE LIMIT ONTOP : 9.9 LIFESTYLE SHOPPING MATTERS
Period: 6-14 Sep ,2022

1.)  ลดสูงสุด 15% ไม่มีขั้นต่ำ (ตามลิมิทแบรนด์)
15%,20% > จะลดตามโปรคือ 15% 
------------------------------------------------------------------------
**พิเศษ วันที่ 9 September วันเดียว เท่านั้น! 
ซื้อครบ 15,000 บาท (สุทธิ) รับส่วนลดเพิ่ม ท้ายบิล มูลค่า 2,900 บาท
จำนวน 99 ออเดอร์แรก ต่อสาขา ', 'lifestyle', '2022-09-05 17:00:00.000', '2022-09-14 16:59:59.000', 'inactive', '2022-09-05 11:16:20.070', '2022-09-08 11:30:14.913');
INSERT INTO public.campaigns (id, "name", description, organization_code, start_date, end_date, status, created_date, updated_date) VALUES('36bfff59-6181-440a-a91b-85d42764e20a'::uuid, 'BEAUTY LIMIT ONTOP : 9.9 BEAUTY SHOPPING MATTERS', 'BEAUTY LIMIT ONTOP : 9.9 BEAUTY SHOPPING MATTERS
Period: 6-14 Sep ,2022
1.)  ลดสูงสุด 15% ไม่มีขั้นต่ำ (ตามลิมิทแบรนด์)
15%,20% > จะลดตามโปรคือ 15% 
------------------------------------------------------------------------
**พิเศษ วันที่ 9 September วันเดียว เท่านั้น! 
ซื้อครบ 15,000 บาท (สุทธิ) รับส่วนลดเพิ่ม ท้ายบิล มูลค่า 2,900 บาท
จำนวน 99 ออเดอร์แรก ต่อสาขา ', 'beauty', '2022-09-05 17:00:00.000', '2022-09-14 16:59:59.000', 'inactive', '2022-09-05 11:20:09.756', '2022-09-08 11:30:53.991');
INSERT INTO public.campaigns (id, "name", description, organization_code, start_date, end_date, status, created_date, updated_date) VALUES('8027efd7-811a-46ed-977f-901f831a0878'::uuid, 'BEAUTY LIMIT ONTOP : 9.9 BEAUTY SHOPPING MATTERS (v2)', 'BEAUTY LIMIT ONTOP : 9.9 BEAUTY SHOPPING MATTERS
Period: 6-14 Sep ,2022
1.)  ลดสูงสุด 15% ไม่มีขั้นต่ำ (ตามลิมิทแบรนด์)
15%,20% > จะลดตามโปรคือ 15% 
------------------------------------------------------------------------
**พิเศษ วันที่ 9 September วันเดียว เท่านั้น! 
ซื้อครบ 15,000 บาท (สุทธิ) รับส่วนลดเพิ่ม ท้ายบิล มูลค่า 2,900 บาท
จำนวน 99 ออเดอร์แรก ต่อสาขา 
', 'beauty', '2022-09-05 17:00:00.000', '2022-09-14 16:59:59.000', 'active', '2022-09-08 11:34:18.953', '2022-09-08 11:34:18.953');

DROP TABLE IF EXISTS public.coupon;
CREATE TABLE public.coupon (
	id uuid NOT NULL,
	"name" text NULL,
	description text NULL,
	remark text NULL,
	term_condition text NULL,
	image text NULL,
	start_date timestamp NULL,
	end_date timestamp NULL,
	status text NULL,
	created_date timestamp NOT NULL,
	updated_date timestamp NOT NULL,
	CONSTRAINT coupon_pkey PRIMARY KEY (id)
);

INSERT INTO public.coupon (id, "name", description, remark, term_condition, image, start_date, end_date, status, created_date, updated_date) VALUES('6da404e3-305c-4b70-aeb2-d61bc6af21e1'::uuid, 'Coupon Next Purchase', 'เมื่อซื้อสินค้าชิ้นใดก็ได้ รับฟรี 
คูปองโค้ดส่วนลดสูงสุด 12% (เมื่อช้อปขั้นต่ำ 3,500.-)  Lifestyle 
คูปองโค้ดส่วนลดสูงสุด 12% (เมื่อช้อปขั้นต่ำ 1,000.-)  Beauty
(สำหรับซื้อครั้งถัดไปผ่าน Web และ Application เท่านั้น) 
*แจกคูปองทุกวัน เพียงซื้อสินค้า Firster รับเลย Voucher 1 ใบ ต่อ 1 ใบเสร็จ
** คูปองใช้ได้ระยะเวลา 1 เดือน', '', 'เงื่อนไขการใช้โค้ดคูปองส่วนลด Next Purchase



 1.รหัสส่วนลดสามารถใช้ได้ที่ WEBSITE และ APPLICATION FIRSTER LIFESTYLE และ FIRSTER BEAUTY ตั้งแต่ที่ 11 มีนาคม – 31 ธันวาคม 2565
  2. เฉพาะแบรนด์และสินค้าที่ร่วมรายการ
  3. รหัสส่วนลด ไม่สามารถใช้ร่วมกับบัตรส่วนลดอื่นๆ Gift Voucher, Cash Voucher ทุกประเภท และโปรโมชั่นอื่นๆ
  4. รหัสส่วนลดนี้ไม่สามารถแลก เปลี่ยน หรือทอนเป็นเงินสดได้
  5. รหัสส่วนลด 1 รหัส / 1 การสั่งซื้อ / 1 บัญชีสมาชิก
  6. บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขรายการส่งเสริมการขายได้ทุกเวลาโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
  7.เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด', 'https://kpc-apps-sales-support.s3.ap-southeast-1.amazonaws.com/production/coupon/1662015672726.png', '2022-03-31 17:00:00.000', '2022-12-31 16:59:59.000', 'active', '2022-09-01 07:01:12.922', '2022-09-01 07:01:12.922');


INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('f0ceba27-1031-457e-83c3-1a79879ae7bf'::uuid, '012f7ec3-1016-4c1c-a3b9-203d1d8d66c9'::uuid, '2022-09-01 04:21:44.032', '2022-09-01 04:21:44.032');
INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('81897969-8c1f-43ad-9b5f-de0c263a8134'::uuid, '012f7ec3-1016-4c1c-a3b9-203d1d8d66c9'::uuid, '2022-09-01 08:18:17.071', '2022-09-01 08:18:17.071');
INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('69d2ef7c-fffd-4535-92ea-76f78c374379'::uuid, '089f6a17-db17-479b-ace6-9abfc654c0f7'::uuid, '2022-09-01 12:31:31.378', '2022-09-01 12:31:31.378');
INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('45e5ce46-373c-4db1-891c-5f83f5665baf'::uuid, '089f6a17-db17-479b-ace6-9abfc654c0f7'::uuid, '2022-09-01 12:31:39.261', '2022-09-01 12:31:39.261');
INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('2a3f7143-9018-4570-a08e-c32d54fead7e'::uuid, '012f7ec3-1016-4c1c-a3b9-203d1d8d66c9'::uuid, '2022-09-02 06:29:08.883', '2022-09-02 06:29:08.883');
INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('4835ae49-66d8-4ccd-8611-8e7ac7d37c61'::uuid, 'c1a51f63-dbd6-44b2-a2d4-1b5805ff4656'::uuid, '2022-09-02 06:29:57.168', '2022-09-02 06:29:57.168');
INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('987bed67-b2e9-423e-b7de-3c146e9c18aa'::uuid, 'e117ccff-a6ea-4879-a470-15389866df90'::uuid, '2022-09-02 09:05:32.149', '2022-09-02 09:05:32.149');
INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('66158709-6122-4117-ae58-2303ec603207'::uuid, '7ad0f978-11b9-41dd-ab97-81104e8ca170'::uuid, '2022-09-06 10:09:52.258', '2022-09-06 10:09:52.258');
INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('c49ffda8-fba3-41fd-b6fb-7b78c67e7621'::uuid, '03d36c54-590e-48d8-8dd4-67dea1c43030'::uuid, '2022-09-08 09:26:06.532', '2022-09-08 09:26:06.532');
INSERT INTO public.sales_count (id, user_id, created_date, updated_date) VALUES('f04302a5-4ed5-4235-85f8-8ba5df09d409'::uuid, '7ad0f978-11b9-41dd-ab97-81104e8ca170'::uuid, '2022-09-11 08:39:51.991', '2022-09-11 08:39:51.991');

INSERT INTO public.users (id, username, "password", firstname, lastname, branch, created_date, updated_date, roles) VALUES('012f7ec3-1016-4c1c-a3b9-203d1d8d66c9'::uuid, 'superadmin', '$2a$10$7cS/YUyvhCaG11Fcruea../tQ0MxEbgzEjbwpu4Y75O81slVOJfa.', 'super', 'admin', 'siam', '2022-08-03 11:05:56.903', '2022-08-03 11:05:56.903', '{admin,super-admin}');

