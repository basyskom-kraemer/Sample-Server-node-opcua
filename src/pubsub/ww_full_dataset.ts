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

import { CreateFieldEntry, CreatePublishedData } from "./dataset_base";



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
        CreateFieldEntry("AssetIdNode", DataType.String),
        CreateFieldEntry("DeviceClassNode", DataType.String),
        CreateFieldEntry("HardwareRevNode", DataType.String),
        CreateFieldEntry("LocationNode", DataType.String),
        CreateFieldEntry("LocationGpsNode", DataType.String),
        CreateFieldEntry("LocationPlantNode", DataType.String),
        CreateFieldEntry("ManufacturerUriNode", DataType.String),
        CreateFieldEntry("ProductCodeNode", DataType.String),
        CreateFieldEntry("ProductInstanceUriNode", DataType.String),
        CreateFieldEntry("SerialNumberNode", DataType.String),
        CreateFieldEntry("SoftwareRevisionNode", DataType.String),
        CreateFieldEntry("YearOfConstructionNode", DataType.UInt16),
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
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6026`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6018`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6029`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6031`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6032`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6033`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6034`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6036`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6021`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6022`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6037`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6023`),
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
        CreateFieldEntry("AirPresent", DataType.Boolean),
        CreateFieldEntry("Alarm", DataType.Boolean),
        CreateFieldEntry("Calibrated", DataType.Boolean),
        CreateFieldEntry("DustChipSuction", DataType.Boolean),
        CreateFieldEntry("Emergency", DataType.Boolean),
        CreateFieldEntry("EnergySafing", DataType.Boolean),
        CreateFieldEntry("Error", DataType.Boolean),
        CreateFieldEntry("ExternalEmergency", DataType.Boolean),
        CreateFieldEntry("FeedRuns", DataType.Boolean),
        CreateFieldEntry("Hold", DataType.Boolean),
        CreateFieldEntry("LoadingEnabled", DataType.Boolean),
        CreateFieldEntry("MachineInit", DataType.Boolean),
        CreateFieldEntry("MachineOn", DataType.Boolean),
        CreateFieldEntry("MaintananceRequired", DataType.Boolean),
        CreateFieldEntry("ManualActivityRequired", DataType.Boolean),
        CreateFieldEntry("Moving", DataType.Boolean),
        CreateFieldEntry("PowerPresent", DataType.Boolean),
        CreateFieldEntry("RecipeInHold", DataType.Boolean),
        CreateFieldEntry("RecipeInRun", DataType.Boolean),
        CreateFieldEntry("RecipeInSetup", DataType.Boolean),
        CreateFieldEntry("Remote", DataType.Boolean),
        CreateFieldEntry("Safety", DataType.Boolean),
        CreateFieldEntry("WaitLoad", DataType.Boolean),
        CreateFieldEntry("WaitUnload", DataType.Boolean),
        CreateFieldEntry("Warning", DataType.Boolean),
        CreateFieldEntry("WorkpiecePresent", DataType.Boolean),
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
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6048`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6039`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6040`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6049`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6041`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6050`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6042`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6051`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6052`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6053`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6054`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6043`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6044`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6055`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6056`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6057`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6045`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6058`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6046`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6059`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6060`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6061`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6062`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6063`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6047`),
        CreatePublishedData(AttributeIds.Value, 1000, `${nodeId};i=6064`)
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