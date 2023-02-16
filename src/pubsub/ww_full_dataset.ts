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

import { createFieldEntry, createPublishedData } from "./dataset_base";



export const createWwFullIdentificationDataSet = (): PublishedDataSetDataTypeOptions => {

    var nodeId = 'ns=34'

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

        // Define full woodworking IDENTIFICATION nodes
        createFieldEntry("AssetIdNode", DataType.String),
        createFieldEntry("DeviceClassNode", DataType.String),
        createFieldEntry("HardwareRevNode", DataType.String),
        createFieldEntry("LocationNode", DataType.String),
        createFieldEntry("LocationGpsNode", DataType.String),
        createFieldEntry("LocationPlantNode", DataType.String),
        createFieldEntry("ManufacturerUriNode", DataType.String),
        createFieldEntry("ProductCodeNode", DataType.String),
        createFieldEntry("ProductInstanceUriNode", DataType.String),
        createFieldEntry("SerialNumberNode", DataType.String),
        createFieldEntry("SoftwareRevisionNode", DataType.String),
        createFieldEntry("YearOfConstructionNode", DataType.UInt16),
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

        // Set full woodworking IDENTIFICATION nodes
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6026`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6018`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6029`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6031`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6032`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6033`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6034`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6036`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6021`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6022`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6037`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6023`),
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

export const createWwFullFlagsDataSet = (): PublishedDataSetDataTypeOptions => {

    var nodeId = 'ns=34'

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

        // Define full woodworking FLAGS nodes
        createFieldEntry("AirPresent", DataType.Boolean),
        createFieldEntry("Alarm", DataType.Boolean),
        createFieldEntry("Calibrated", DataType.Boolean),
        createFieldEntry("DustChipSuction", DataType.Boolean),
        createFieldEntry("Emergency", DataType.Boolean),
        createFieldEntry("EnergySafing", DataType.Boolean),
        createFieldEntry("Error", DataType.Boolean),
        createFieldEntry("ExternalEmergency", DataType.Boolean),
        createFieldEntry("FeedRuns", DataType.Boolean),
        createFieldEntry("Hold", DataType.Boolean),
        createFieldEntry("LoadingEnabled", DataType.Boolean),
        createFieldEntry("MachineInit", DataType.Boolean),
        createFieldEntry("MachineOn", DataType.Boolean),
        createFieldEntry("MaintananceRequired", DataType.Boolean),
        createFieldEntry("ManualActivityRequired", DataType.Boolean),
        createFieldEntry("Moving", DataType.Boolean),
        createFieldEntry("PowerPresent", DataType.Boolean),
        createFieldEntry("RecipeInHold", DataType.Boolean),
        createFieldEntry("RecipeInRun", DataType.Boolean),
        createFieldEntry("RecipeInSetup", DataType.Boolean),
        createFieldEntry("Remote", DataType.Boolean),
        createFieldEntry("Safety", DataType.Boolean),
        createFieldEntry("WaitLoad", DataType.Boolean),
        createFieldEntry("WaitUnload", DataType.Boolean),
        createFieldEntry("Warning", DataType.Boolean),
        createFieldEntry("WorkpiecePresent", DataType.Boolean),
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

        // Set full woodworking FLAGS nodes
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6048`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6039`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6040`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6049`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6041`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6050`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6042`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6051`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6052`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6053`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6054`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6043`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6044`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6055`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6056`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6057`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6045`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6058`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6046`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6059`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6060`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6061`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6062`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6063`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6047`),
        createPublishedData(AttributeIds.Value, 1000, `${nodeId};i=6064`)
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