import { 
    DataType,
    resolveNodeId,
    AttributeIds
} from "node-opcua";
import { 
    DataSetFieldContentMask,
    JsonDataSetMessageContentMask,
    JsonNetworkMessageContentMask,
    BrokerTransportQualityOfService,
    MyMqttJsonPubSubConnectionDataType,
    Transport,
    PublishedDataItemsDataType,
    MyMqttJsonPubSubConnectionDataTypeOptions,
    MyMqttJsonWriterGroupDataTypeOptions,
    MyJsonDataSetWriterDataTypeOptions,
    PubSubConfigurationDataTypeOptions
} from "node-opcua-pubsub-expander";
import { 
    PubSubConfigurationDataType,
    PubSubConnectionDataTypeOptions,
    PublishedDataSetDataTypeOptions,
    FieldMetaDataOptions
} from "node-opcua-types";


const prefix = "basyskom"
//const dataPrefix = `${prefix}/json/machines`
//const metaPrefix = `${prefix}/json/machines/metadata`
const dataPrefix = `${prefix}/json/machines`
const metadataPrefix = `${prefix}/json/machines`


// const dataPrefix = `${prefix}/json/data/urn:SampleServer-node-opcua`
// const metaPrefix = `${prefix}/json/metadata/urn:SampleServer-node-opcua`


const createWriterGroup = (name: string, dataSetWriter: MyJsonDataSetWriterDataTypeOptions): MyMqttJsonWriterGroupDataTypeOptions => {
    const writerGroup: MyMqttJsonWriterGroupDataTypeOptions = {
        dataSetWriters: [dataSetWriter],
        enabled: true,
        publishingInterval: 1000,
        name: name,
        messageSettings: {
            networkMessageContentMask: JsonNetworkMessageContentMask.PublisherId,
        },
        transportSettings: {
            requestedDeliveryGuarantee: BrokerTransportQualityOfService.AtMostOnce
        },
    }
    return writerGroup
}


const createConnection = (name: string, dataSetName: string, writerGroupName: string, broker: string, id: number): PubSubConnectionDataTypeOptions => {
    const dataSetWriter: MyJsonDataSetWriterDataTypeOptions = {
        dataSetFieldContentMask: DataSetFieldContentMask.None,
            // DataSetFieldContentMask.SourceTimestamp |
            // DataSetFieldContentMask.StatusCode,
        dataSetName: dataSetName,
        dataSetWriterId: id,
        enabled: true,
        name: name,
        messageSettings: {
            // dataSetMessageContentMask?: JsonDataSetMessageContentMask;
            dataSetMessageContentMask: JsonDataSetMessageContentMask.None
                // JsonDataSetMessageContentMask.DataSetWriterId | 
                // JsonDataSetMessageContentMask.MetaDataVersion |
                // JsonDataSetMessageContentMask.DataSetWriterName |
                // JsonDataSetMessageContentMask.MessageType |
                // JsonDataSetMessageContentMask.SequenceNumber |
                // JsonDataSetMessageContentMask.Status |
                // JsonDataSetMessageContentMask.Timestamp
        },
        transportSettings: {
            // queueName?: UAString;
            // resourceUri?: UAString;
            // authenticationProfileUri?: UAString;
            // requestedDeliveryGuarantee?: BrokerTransportQualityOfService;
            // metaDataQueueName?: UAString;
            // metaDataUpdateTime?: Double;
            queueName: `${dataPrefix}/${writerGroupName}/identification`,
            metaDataQueueName: `${metadataPrefix}/${writerGroupName}/identification`,
            // queueName: `${dataPrefix}/${writerGroupName}/VariableDataSetWriter`,
            // metaDataQueueName: `${metaPrefix}/${writerGroupName}/VariableDataSetWriter`,
            metaDataUpdateTime: 5000
        },
    };

    const writerGroup: MyMqttJsonWriterGroupDataTypeOptions = createWriterGroup(writerGroupName, dataSetWriter)

    const opts: MyMqttJsonPubSubConnectionDataTypeOptions = {
        enabled: true,
        name: `Connection_${id}_${broker}`,
        transportProfileUri: Transport.MQTT_JSON,
        transportSettings: {
            // resourceUri?: UAString;
            // authenticationProfileUri?: UAString;
        },
        address: {
            url: broker,
        },
        writerGroups: [writerGroup],
        readerGroups: []
    }
    return new MyMqttJsonPubSubConnectionDataType(opts)
}


const createBasicWoodWorkingDataSet = (): PublishedDataSetDataTypeOptions => {

    const fields: FieldMetaDataOptions[] = [
        // {
        //     name?: UAString;
        //     description?: (LocalizedTextLike | null);
        //     fieldFlags?: DataSetFieldFlags;
        //     builtInType?: Byte;
        //     dataType?: (NodeIdLike | null);
        //     valueRank?: Int32;
        //     arrayDimensions?: UInt32[] | null;
        //     maxStringLength?: UInt32;
        //     dataSetFieldId?: Guid;
        //     properties?: KeyValuePairOptions[] | null;
        // }
        {
            name: "DeviceClass",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "Manufactor",
            builtInType: DataType.LocalizedText,
            dataType: resolveNodeId("LocalizedText"),
        },
        {
            name: "Model",
            builtInType: DataType.LocalizedText,
            dataType: resolveNodeId("LocalizedText"),
        },
        {
            name: "ProductInstanceUri",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "SerialNumber",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "YearOfConstruction",
            builtInType: DataType.UInt16,
            dataType: resolveNodeId("UInt16"),
        }

    ]

    const publishedData = [
        // {
        //     publishedVariable?: (NodeIdLike | null);
        //     attributeId?: UInt32;
        //     samplingIntervalHint?: Double;
        //     deadbandType?: UInt32;
        //     deadbandValue?: Double;
        //     indexRange?: NumericRange;
        //     substituteValue?: (VariantLike | null);
        //     metaDataProperties?: (QualifiedNameLike | null)[] | null;
        // }
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6001`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6002`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6003`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6004`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6005`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6006`,
        }
    ]

    const publishedDataSet: PublishedDataSetDataTypeOptions = {
        name: "PublishedBasicWoodWorking",
        dataSetMetaData: {
            fields: fields,
        },
        dataSetSource: new PublishedDataItemsDataType({
            publishedData: publishedData,
        }),
    };
    return publishedDataSet;
}


const createFullWoodWorkingDataSet = (): PublishedDataSetDataTypeOptions => {

    const fields: FieldMetaDataOptions[] = [
        // {
        //     name?: UAString;
        //     description?: (LocalizedTextLike | null);
        //     fieldFlags?: DataSetFieldFlags;
        //     builtInType?: Byte;
        //     dataType?: (NodeIdLike | null);
        //     valueRank?: Int32;
        //     arrayDimensions?: UInt32[] | null;
        //     maxStringLength?: UInt32;
        //     dataSetFieldId?: Guid;
        //     properties?: KeyValuePairOptions[] | null;
        // }

        {
            name: "AssetIdNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "DeviceClassNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "HardwareRevNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "LocationNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "LocationGpsNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "LocationPlantNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "ManufacturerUriNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "ProductCodeNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "ProductInstanceUriNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "SerialNumberNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "SoftwareRevisionNode",
            builtInType: DataType.String,
            dataType: resolveNodeId("String"),
        },
        {
            name: "YearOfConstructionNode",
            builtInType: DataType.UInt16,
            dataType: resolveNodeId("UInt16"),
        }
    ]

    const publishedData = [
        // {
        //     publishedVariable?: (NodeIdLike | null);
        //     attributeId?: UInt32;
        //     samplingIntervalHint?: Double;
        //     deadbandType?: UInt32;
        //     deadbandValue?: Double;
        //     indexRange?: NumericRange;
        //     substituteValue?: (VariantLike | null);
        //     metaDataProperties?: (QualifiedNameLike | null)[] | null;
        // }
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6026`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6018`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6029`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6031`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6032`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6033`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6034`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6036`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6021`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6022`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6037`,
        },
        {
            attributeId: AttributeIds.Value,
            samplingIntervalHint: 1000,
            publishedVariable: `ns=34;i=6023`,
        }
    ]

    const publishedDataSet: PublishedDataSetDataTypeOptions = {
        name: "PublishedFullWoodWorking",
        dataSetMetaData: {
            fields: fields,
        },
        dataSetSource: new PublishedDataItemsDataType({
            publishedData: publishedData,
        }),
    };
    return publishedDataSet;
}


export const constructMqttJsonPubSubConfiguration = (broker: string) => {
    const opts: PubSubConfigurationDataTypeOptions = {
        connections: [
            createConnection("dataSet_BasicWoodWorking", "PublishedBasicWoodWorking", "basic_woodworking", broker, 1),
            createConnection("dataSet_FullWoodWorking", "PublishedFullWoodWorking", "full_woodworking", broker, 2)
        ],
        publishedDataSets: [
            createBasicWoodWorkingDataSet(),
            createFullWoodWorkingDataSet()
        ]
    }
    return new PubSubConfigurationDataType(opts);
}
